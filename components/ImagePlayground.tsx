"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageDisplay } from "@/components/ImageDisplay";
import { PromptInput } from "@/components/PromptInput";
import { StyleCarousel } from "@/components/StyleCarousel";
import { CustomStyleInput } from "@/components/CustomStyleInput/CustomStyleInput";
import { WelcomeOverlay } from "@/components/WelcomeOverlay/WelcomeOverlay";
import { ProviderKey } from "@/lib/provider-config";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useToast } from "@/hooks/use-toast";
import { useImageGeneration } from "@/hooks/use-image-generation";
import { 
  TATTOO_STYLES 
} from "@/components/Tattoo-Styles/config";
import { 
  TATTOO_COLORS 
} from "@/components/Tattoo Colors/config";
import { 
  TATTOO_RATIOS 
} from "@/components/Tattoo Aspect Ratio/config";
import { TattooOption } from "@/lib/api-types";

export function ImagePlayground({}: {}) {
  const {
    images,
    timings,
    failedProviders,
    isLoading,
    startGeneration,
    activePrompt,
  } = useImageGeneration();

  const [promptInput, setPromptInput] = useState("");
  
  // Initialize with defaults as requested ("except the defaults that I have")
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedRatioId, setSelectedRatioId] = useState<string | null>(null);
  
  const [customStyle, setCustomStyle] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState<string | null>(null);
  
  const [isActivated, setIsActivated] = useState(false);

  // Combine colors and ratios for the vibe carousel
  const dividerOption: TattooOption = {
    id: "divider",
    label: "",
    value: "divider",
    imageUrl: "/divider-sign.png",
    group: "divider"
  };

  const vibeOptions: TattooOption[] = [...TATTOO_COLORS, dividerOption, ...TATTOO_RATIOS];

  const { toast } = useToast();

  const handlePromptSubmit = () => {
    const newPrompt = promptInput;
    
    // Validation Gates
    if (!selectedStyleId && !customStyle) {
      toast({
        title: "Missing Style",
        description: "Please select a tattoo style to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedColorId && !customColor) {
      toast({
        title: "Missing Color",
        description: "Please select a color preference.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedRatioId) {
      toast({
        title: "Missing Aspect Ratio",
        description: "Please select an aspect ratio.",
        variant: "destructive",
      });
      return;
    }

    if (!newPrompt || newPrompt.trim().length < 10) {
      toast({
        title: "Answer Too Short",
        description: "Your answer must be at least 10 characters long to generate a meaningful design.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedStyle = TATTOO_STYLES.find(s => s.id === selectedStyleId);
    const selectedColor = TATTOO_COLORS.find(c => c.id === selectedColorId);
    const selectedRatio = TATTOO_RATIOS.find(r => r.id === selectedRatioId);

    const finalStyle = (selectedStyle?.isCustom ? customStyle : selectedStyle?.value) ?? null;
    const finalColor = (selectedColor?.isCustom ? customColor : selectedColor?.value) ?? null;
    const finalRatio = selectedRatio?.value ?? null;

    console.log("Submitting Generation Request:", { 
        prompt: newPrompt, 
        style: finalStyle, 
        color: finalColor, 
        ratio: finalRatio 
    });

    // Single provider, no fallbacks
    const providers: ProviderKey[] = ["default"]; 
    const providerToModel: Record<ProviderKey, string> = {
        default: "dify-workflow",
    };

    startGeneration(
      newPrompt,
      finalStyle,
      finalColor,
      finalRatio,
      providers,
      providerToModel
    );
  };

  const getLabelForId = (id: string | null, options: TattooOption[]) => {
    if (!id) return null;
    const opt = options.find(o => o.id === id);
    return opt?.label || null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Prompt + controls area: full width with exactly 10px side padding */}
      <div className="px-[10px] pt-4">
        <div className="relative mb-4">
          <AnimatePresence>
            {!isActivated && (
              <WelcomeOverlay onActivate={() => setIsActivated(true)} />
            )}
          </AnimatePresence>
          
          <div className={!isActivated ? "opacity-0 pointer-events-none" : ""}>
            <PromptInput
              value={promptInput}
              onChange={setPromptInput}
              onSubmit={handlePromptSubmit}
              isLoading={isLoading}
              selectedStyle={
                 selectedStyleId === "custom-style"
                   ? (customStyle ? `Custom: ${customStyle}` : "Custom Style")
                   : getLabelForId(selectedStyleId, TATTOO_STYLES)
              }
              onClearStyle={() => {
                setSelectedStyleId(null);
                setCustomStyle(null);
              }}
              selectedColor={getLabelForId(selectedColorId, TATTOO_COLORS)}
              onClearColor={() => setSelectedColorId(null)}
              selectedRatio={getLabelForId(selectedRatioId, TATTOO_RATIOS)}
              onClearRatio={() => setSelectedRatioId(null)}
            />
          </div>
        </div>
        <div className="mt-2 space-y-4">
          {/* Always-rendered Style carousel */}
          <StyleCarousel
            visible={true}
            options={TATTOO_STYLES}
            onSelect={(option) => {
              setSelectedStyleId(option.id);
            }}
            selected={selectedStyleId}
            emptyMessage="No styles available."
          />

          {/* Always-rendered Vibe carousel (colors + ratios) below style */}
          <StyleCarousel
            visible={true}
            options={vibeOptions}
            onSelect={(option) => {
              // Vibe logic: clearly distinguish using the 'group' property
              if (option.group === "color") {
                setSelectedColorId(option.id);
              } else if (option.group === "ratio") {
                setSelectedRatioId(option.id);
              }
            }}
            selected={[selectedColorId, selectedRatioId].filter((s): s is string => !!s)}
            emptyMessage="No vibes available."
          />
        </div>

        <CustomStyleInput
          isVisible={selectedStyleId === "custom-style"}
          onSubmit={(style) => setCustomStyle(style)}
        />
        
        <CustomStyleInput
          isVisible={selectedColorId === "custom-color"}
          onSubmit={(color) => setCustomColor(color)}
        />
        <div className="flex justify-center my-20 py-12 relative z-10">
          <div className={isLoading ? "opacity-50 pointer-events-none scale-[1.75] origin-center" : "scale-[1.75] origin-center"}>
            <LiquidMetalButton
              label={isLoading ? "INKING..." : "INK ME UP"}
              onClick={handlePromptSubmit}
              viewMode="text"
            />
          </div>
        </div>
      </div>

      {/* Image display area left as-centered block; not part of the 10px prompt padding rule */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-6">
          {images.length === 0 ? (
            // Render placeholders if no images (e.g. initial state)
             [0, 1].map((idx) => (
                <ImageDisplay
                  key={`placeholder-${idx}`}
                  provider={`Slot ${idx + 1}`}
                  image={null}
                  modelId=""
                  failed={false}
                />
             ))
          ) : (
            images.map((img, idx) => (
              <ImageDisplay
                key={idx}
                provider={img.provider}
                image={img.image}
                modelId={img.modelId}
                timing={timings[img.provider]}
                failed={failedProviders.includes(img.provider)}
              />
            ))
          )}
        </div>

        {activePrompt && activePrompt.length > 0 && (
          <div className="text-center mt-4 text-muted-foreground">
            {activePrompt}
          </div>
        )}
      </div>
    </div>
  );
}
