"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageDisplay } from "@/components/ImageDisplay";
import { PromptInput } from "@/components/PromptInput";
import { StyleCarousel } from "@/components/StyleCarousel";
import { PlaygroundControls } from "@/components/PlaygroundControls/PlaygroundControls";
import { CustomStyleInput } from "@/components/CustomStyleInput/CustomStyleInput";
import { WelcomeOverlay } from "@/components/WelcomeOverlay/WelcomeOverlay";
import { ProviderKey } from "@/lib/provider-config";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useToast } from "@/hooks/use-toast";
import { useImageGeneration } from "@/hooks/use-image-generation";
import { TATTOO_STYLES } from "@/components/Tattoo-Styles/config";
import { TATTOO_COLORS } from "@/components/Tattoo Colors/config";
import { TATTOO_RATIOS } from "@/components/Tattoo Aspect Ratio/config";
import { TattooOption } from "@/lib/api-types";
import { ImageComparisonDemo } from "@/components/TaTTTyComparisson";
import { GenerateButton } from "@/components/Generate-Button/GenerateButton";

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
  const [activeCarousel, setActiveCarousel] = useState<"style" | "vibe">(
    "style"
  );

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
    group: "divider",
  };

  const vibeOptions: TattooOption[] = [
    ...TATTOO_COLORS,
    dividerOption,
    ...TATTOO_RATIOS,
  ];

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
        description:
          "Your answer must be at least 10 characters long to generate a meaningful design.",
        variant: "destructive",
      });
      return;
    }

    const selectedStyle = TATTOO_STYLES.find((s) => s.id === selectedStyleId);
    const selectedColor = TATTOO_COLORS.find((c) => c.id === selectedColorId);
    const selectedRatio = TATTOO_RATIOS.find((r) => r.id === selectedRatioId);

    const finalStyle =
      (selectedStyle?.isCustom ? customStyle : selectedStyle?.value) ?? null;
    const finalColor =
      (selectedColor?.isCustom ? customColor : selectedColor?.value) ?? null;
    const finalRatio = selectedRatio?.value ?? null;

    console.log("Submitting Generation Request:", {
      prompt: newPrompt,
      style: finalStyle,
      color: finalColor,
      ratio: finalRatio,
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
    const opt = options.find((o) => o.id === id);
    return opt?.label || null;
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground pb-4 overflow-x-hidden">
      <div className="w-full px-[10px] pt-[10px]">
        <div className="relative mb-2 w-full grid grid-cols-1">
          <div className={`col-start-1 row-start-1 w-full transition-opacity duration-500 ${!isActivated ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <PromptInput
              value={promptInput}
              onChange={setPromptInput}
              onSubmit={handlePromptSubmit}
              isLoading={isLoading}
              selectedStyle={
                selectedStyleId === "custom-style"
                  ? customStyle
                    ? `Custom: ${customStyle}`
                    : "Custom Style"
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

          <AnimatePresence>
            {!isActivated && (
              <WelcomeOverlay 
                onActivate={() => setIsActivated(true)} 
                className="col-start-1 row-start-1"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full px-[10px] mx-auto">
        <PlaygroundControls
          activeCarousel={activeCarousel}
          onCarouselChange={setActiveCarousel}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCarousel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center"
          >
            <StyleCarousel
              visible={true}
              options={activeCarousel === "style" ? TATTOO_STYLES : vibeOptions}
              onSelect={(option) => {
                if (activeCarousel === "style") {
                  setSelectedStyleId(option.id);
                } else {
                  // Vibe logic: clearly distinguish using the 'group' property
                  if (option.group === "color") {
                    setSelectedColorId(option.id);
                  } else if (option.group === "ratio") {
                    setSelectedRatioId(option.id);
                  }
                }
              }}
              selected={
                activeCarousel === "style"
                  ? selectedStyleId
                  : [selectedColorId, selectedRatioId].filter(
                      (s): s is string => !!s
                    )
              }
              emptyMessage={
                activeCarousel === "style"
                  ? "No styles available."
                  : "No vibes available."
              }
            />
          </motion.div>
        </AnimatePresence>

        <CustomStyleInput
          isVisible={
            activeCarousel === "style" && selectedStyleId === "custom-style"
          }
          onSubmit={(style) => setCustomStyle(style)}
        />

        <CustomStyleInput
          isVisible={
            activeCarousel === "vibe" && selectedColorId === "custom-color"
          }
          onSubmit={(color) => setCustomColor(color)}
        />

        <div className="flex justify-center my-20 py-12 relative z-10">
          <GenerateButton
            onClick={handlePromptSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-center w-full mx-auto mt-6">
          <AnimatePresence mode="wait">
            {images.length > 0 && !isLoading ? (
              images.slice(0, 1).map((img, idx) => (
                <motion.div
                  key={`result-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  <ImageDisplay
                    provider={img.provider}
                    image={img.image}
                    modelId={img.modelId}
                    timing={timings[img.provider]}
                    failed={failedProviders.includes(img.provider)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="comparison"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center pb-[50px]"
              >
                <ImageComparisonDemo />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activePrompt && activePrompt.length > 0 && images.length === 0 && (
          <div className="text-center mt-4 text-muted-foreground">
            {activePrompt}
          </div>
        )}
      </div>
    </div>
  );
}
