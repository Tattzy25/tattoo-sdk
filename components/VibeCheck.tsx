"use client";

import { Button } from "@/components/ui/button";

interface VibeCheckProps {
  onClick?: () => void;
}

export function VibeCheck({ onClick }: Readonly<VibeCheckProps>) {
  return (
    <Button
      variant="default"
      size="default"
      className="rounded-full"
      onClick={onClick}
    >
      Vibe Check
    </Button>
  );
}


