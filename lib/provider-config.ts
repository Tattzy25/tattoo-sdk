export type ProviderKey = "mcp";
export type ModelMode = "performance" | "quality";

export const PROVIDERS: Record<
  ProviderKey,
  {
    displayName: string;
    iconPath: string;
    color: string;
    models: string[];
  }
> = {
  mcp: {
    displayName: "Tattty AI",
    iconPath: "/provider-icons/replicate.svg", // Keeping existing icon to prevent 404
    color: "from-purple-500 to-blue-500",
    models: [
      "default"
    ],
  },
};

export const MODEL_CONFIGS: Record<ModelMode, Record<ProviderKey, string>> = {
  performance: {
    mcp: "default",
  },
  quality: {
    mcp: "default",
  },
};

export const PROVIDER_ORDER: ProviderKey[] = [
  "mcp",
];

export const initializeProviderRecord = <T>(defaultValue?: T) =>
  Object.fromEntries(
    PROVIDER_ORDER.map((key) => [key, defaultValue])
  ) as Record<ProviderKey, T>;
