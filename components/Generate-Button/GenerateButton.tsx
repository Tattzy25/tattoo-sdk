"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { SparklesIcon } from "@/components/ui/sparkles";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function GenerateButton({ onClick, isLoading }: Readonly<GenerateButtonProps>) {
  return (
    <div
      className={
        isLoading
          ? "opacity-50 pointer-events-none scale-[1.75] origin-center"
          : "scale-[1.75] origin-center"
      }
    >
      <LiquidMetalButton
        label={isLoading ? "INKING..." : "INK ME UP"}
        onClick={onClick}
        viewMode="text"
        icon={<SparklesIcon className="w-5 h-5" />}
      />
    </div>
  );
}
