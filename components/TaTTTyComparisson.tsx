import { ImageComparison } from "@/components/ui/image-comparison";
 
export function ImageComparisonDemo() {
  return (
    <ImageComparison
      beforeImage="https://cdn.shopify.com/s/files/1/0649/4155/5787/files/Blackwork.png?v=1769612472"
      afterImage="https://cdn.shopify.com/s/files/1/0649/4155/5787/files/blackwork-color.jpg?v=1769911539"
      beforeLabel="Black & White"
      afterLabel="Full Color"
      className="aspect-video w-full"
    />
  );
}