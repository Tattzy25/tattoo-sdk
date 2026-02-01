import React from "react";
import { Button } from "@/components/ui/button";
import { getStyleLabel } from "@/lib/utils";

interface SelectedStyleBadgeProps {
  selectedStyle: string;
  onClear?: () => void;
}

export function SelectedStyleBadge({
  selectedStyle,
  onClear,
}: Readonly<SelectedStyleBadgeProps>) {
  if (!selectedStyle) return null;

  // The label is already formatted by the parent component (ImagePlayground)
  const label = selectedStyle;

  return (
    <Button
      variant="default"
      size="sm"
      onClick={onClear}
      className="rounded-full"
    >
      {label}
    </Button>
  );
}
