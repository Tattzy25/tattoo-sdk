 import { NextRequest, NextResponse } from "next/server";
 import { GenerateImageRequest } from "@/lib/api-types";
 
 /**
  * Intended to be slightly less than the maximum execution time allowed by the
  * runtime so that we can gracefully terminate our request.
  */
 const TIMEOUT_MILLIS = 55 * 1000;
 
 export async function POST(req: NextRequest) {
   const requestId = Math.random().toString(36).substring(7);
   const { prompt, provider, modelId, style, color, aspectRatio } =
     (await req.json()) as GenerateImageRequest;
 
   try {
     if (!prompt) {
       const error = "Invalid request parameters";
       console.error(`${error} [requestId=${requestId}]`);
       return NextResponse.json({ error }, { status: 400 });
     }
 
     // We are strictly using the MCP provider now
     if (provider !== "mcp") {
          return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
     }
 
     const startstamp = performance.now();
     
     // Using the MCP Endpoint as requested by the user
     const endpoint = "https://api.dify.ai/mcp/server/u4cbxV8X77O1fKSZ/mcp";
     const apiKey = process.env.DIFY_API_KEY;
     
     console.log(`Sending request to MCP Endpoint: ${endpoint} [requestId=${requestId}]`);
 
     // Constructing the payload with the required inputs
     // We map the user's prompt (answer) to 'get_tatttied'
     const payload = {
         inputs: {
             style: style || "Tattoo",
             color: color || "Black and Grey",
             aspect_ratio: aspectRatio || "1:1",
             get_tatttied: prompt,
         },
         response_mode: "blocking",
         user: "tattty-web-user-" + requestId
     };
 
     const headers: Record<string, string> = {
         "Content-Type": "application/json",
     };
 
     // Add Authorization header if API Key is present
     // This allows us to secure the connection whenever we want by just adding the env var
     if (apiKey) {
         headers["Authorization"] = `Bearer ${apiKey}`;
     }
 
     const response = await fetch(endpoint, {
         method: "POST",
         headers: headers,
         body: JSON.stringify(payload),
         signal: AbortSignal.timeout(TIMEOUT_MILLIS)
     });
 
     if (!response.ok) {
         const errorText = await response.text();
         console.error(`MCP server responded with ${response.status}: ${errorText}`);
         throw new Error(`MCP server responded with ${response.status}: ${errorText}`);
     }
 
     const data = await response.json();
     
     console.log(`Received response from MCP server [requestId=${requestId}]:`, JSON.stringify(data, null, 2));
 
     let imageBase64: string | null = null;
     let fileUrl: string | null = null;
 
     // Robust parsing for various Dify/MCP response formats
     // 1. Check for standard Dify 'files' array
     if (data.data?.files && Array.isArray(data.data.files) && data.data.files.length > 0) {
         fileUrl = data.data.files[0].url;
     } 
     // 2. Check for 'outputs' object which might contain the URL
     else if (data.data?.outputs) {
         const outputs = data.data.outputs;
         for (const key in outputs) {
             const val = outputs[key];
             if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('/'))) {
                 fileUrl = val;
                 break;
             }
             if (typeof val === 'object' && val?.url) {
                 fileUrl = val.url;
                 break;
             }
         }
     }
     // 3. Fallback for direct 'files' property
     else if (data.files && Array.isArray(data.files) && data.files.length > 0) {
         fileUrl = data.files[0].url;
     }
     // 4. Check for JSON-RPC style 'result' (common in MCP)
     else if (data.result) {
         // If result is a string URL
         if (typeof data.result === 'string' && data.result.startsWith('http')) {
             fileUrl = data.result;
         } 
         // If result has content/files
         else if (data.result.content && Array.isArray(data.result.content)) {
             // content: [{ type: 'image/png', data: 'base64...' }] or similar
              const imgItem = data.result.content.find((c: any) => c.type === 'image' || c.type === 'resource');
              if (imgItem && imgItem.url) fileUrl = imgItem.url;
              if (imgItem && imgItem.data) imageBase64 = imgItem.data;
         }
     }
 
     // Fetch image if we found a URL
     if (fileUrl) {
         console.log(`Fetching image from URL: ${fileUrl} [requestId=${requestId}]`);
         try {
             const imageResponse = await fetch(fileUrl);
             if (imageResponse.ok) {
                 const arrayBuffer = await imageResponse.arrayBuffer();
                 imageBase64 = Buffer.from(arrayBuffer).toString('base64');
             } else {
                 console.error(`Failed to fetch image content from URL: ${imageResponse.status}`);
             }
         } catch (fetchErr) {
             console.error(`Error fetching image from URL: ${fetchErr}`);
         }
     } else if (data.image) {
         imageBase64 = data.image;
     }
 
     if (!imageBase64) {
         console.warn(`No image found in response [requestId=${requestId}]`);
         // If we can't find an image, we'll return the raw data for debugging in the UI error
         throw new Error("No image data found in response. Check server logs.");
     }
 
     console.log(
       `Completed image request [requestId=${requestId}, provider=${provider}, model=${modelId}, elapsed=${(
         (performance.now() - startstamp) /
         1000
       ).toFixed(1)}s].`
     );
 
     return NextResponse.json({ image: imageBase64 });
 
   } catch (error) {
     console.error(`Error generating image [requestId=${requestId}]:`, error);
     // Return a generic error but log the details
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
   }
 }
 