import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

import { cn } from "@/lib/utils";

interface WelcomeOverlayProps {
  onActivate: () => void;
  className?: string;
}

export function WelcomeOverlay({ onActivate, className }: Readonly<WelcomeOverlayProps>) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "relative z-50 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm overflow-hidden px-8 py-[5px] w-full h-auto",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-[5px]">
        {/* Text Container */}
        <div className="h-[80px] w-full flex items-center justify-center relative">
          <GooeyText
            texts={["Are", "You", "Ready", "For", "The", "ULTIMATE", "MAGICAL", "UNIQUE", "TaTTTy", "Experience", "Of", "A", "Lifetime"]}
            morphTime={1}
            cooldownTime={0.5}
            textClassName="text-5xl font-bold tracking-tighter text-black text-center"
          />
        </div>
        <div className="scale-125 shrink-0 pb-[5px]">
          <Button
            variant="default"
            size="default"
            onClick={onActivate}
            className="rounded-full px-8 font-bold bg-black text-white hover:bg-black/90"
          >
            Activate TaTTTy
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
