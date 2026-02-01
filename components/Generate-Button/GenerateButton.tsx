"use client";

import { Button } from "@/components/ui/button";
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
      <Button
        variant="default"
        size="default"
        onClick={onClick}
        className="rounded-full px-10 h-14 text-lg font-bold font-[family-name:var(--font-rock-salt)] tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <SparklesIcon className="w-6 h-6 mr-4" />
        {isLoading ? "INKING..." : "INK ME UP"}
      </Button>
    </div>
  );
}
