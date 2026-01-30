import { ProviderKey } from "./provider-config";

export interface GenerateImageRequest {
  prompt: string;
  provider: ProviderKey;
  modelId: string;
  style?: string | null;
  color?: string | null;
  aspectRatio?: string | null;
}

export interface GenerateImageResponse {
  image?: string;
  error?: string;
}
