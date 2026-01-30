import React from "react";
import { motion } from "framer-motion";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

interface WelcomeOverlayProps {
  onActivate: () => void;
}

export function WelcomeOverlay({ onActivate }: Readonly<WelcomeOverlayProps>) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white rounded-xl border-4 border-zinc-300 shadow-sm overflow-hidden px-8 pb-10"
    >
      <div className="flex flex-col items-center justify-center gap-[5px]">
        {/* Text Container */}
        <div className="h-[120px] w-full flex items-center justify-center relative">
          <GooeyText
            texts={["Are", "You", "Ready", "For", "The", "ULTIMATE", "MAGICAL", "UNIQUE", "TaTTTy", "Experience", "Of", "A", "Lifetime"]}
            morphTime={1}
            cooldownTime={0.5}
            textClassName="text-5xl font-bold tracking-tighter text-black text-center"
          />
        </div>
        <div className="scale-125 shrink-0">
          <LiquidMetalButton
            label="Activate TaTTTy"
            onClick={onActivate}
            viewMode="text"
          />
        </div>
      </div>
    </motion.div>
  );
}
