"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

interface VibeCheckProps {
  onClick?: () => void;
  isActive?: boolean;
}

export function VibeCheck({ onClick, isActive }: Readonly<VibeCheckProps>) {
  return (
    <LiquidMetalButton
      label="Vibe Check"
      onClick={onClick}
      viewMode="text"
      animate={isActive}
      className={isActive ? "rounded-[100px] shadow-[0_0_8px_rgba(255,255,255,0.9)] border border-white" : ""}
    />
  );
}


