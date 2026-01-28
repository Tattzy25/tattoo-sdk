import { Card, CardContent } from "@/components/ui/card";
import { imageHelpers } from "@/lib/image-helpers";
import { ReplicateIcon } from "@/lib/logos";
import { ProviderKey } from "@/lib/provider-config";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ProviderTiming } from "@/lib/image-types";

import { ImageDisplay } from "./ImageDisplay";
import Link from "next/link";

interface ModelSelectProps {
  label: string;
  models: string[];
  value: string;
  providerKey: ProviderKey;
  onChange: (value: string, providerKey: ProviderKey) => void;
  iconPath: string;
  color: string;
  image: string | null | undefined;
  image2?: string | null | undefined;
  timing?: ProviderTiming;
  failed?: boolean;
  modelId: string;
}

const PROVIDER_ICONS = {
  replicate: ReplicateIcon,
} as const;

const PROVIDER_LINKS = {
  replicate: "replicate",
} as const;

export function ModelSelect({
  label,
  models,
  value,
  providerKey,
  onChange,
  image,
  image2,
  timing,
  failed,
  modelId,
}: ModelSelectProps) {
  const Icon = PROVIDER_ICONS[providerKey];

  return (
    <Card className={cn(`w-full transition-opacity`)}>
      <CardContent className="pt-6 h-full">
        {/* Provider logo + model header intentionally hidden for a clean image grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageDisplay
            modelId={modelId}
            provider={providerKey}
            image={image}
            timing={timing}
            failed={failed}
          />
          <ImageDisplay
            modelId={modelId}
            provider={providerKey}
            image={image2}
            timing={timing}
            failed={failed}
          />
        </div>
      </CardContent>
    </Card>
  );
}
