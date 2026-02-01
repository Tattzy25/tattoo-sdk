"use client";

import { Button } from "@/components/ui/button";

interface VibeCheckProps {
  onClick?: () => void;
  isActive?: boolean;
}

export function VibeCheck({ onClick, isActive }: Readonly<VibeCheckProps>) {
  return (
    <Button
      variant="default"
      size="default"
      onClick={onClick}
      className={isActive ? "rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)] border border-white bg-primary text-primary-foreground hover:bg-primary/90" : "rounded-full bg-primary text-primary-foreground hover:bg-primary/90"}
    >
      Vibe Check
    </Button>
  );
}


