import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/ModeToggle";
import { SelectedStyleBadge } from "@/components/SelectedStyleBadge/SelectedStyleBadge";
import { useToast } from "@/hooks/use-toast";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  selectedStyle?: string | null;
  onClearStyle?: () => void;
  selectedColor?: string | null;
  onClearColor?: () => void;
  selectedRatio?: string | null;
  onClearRatio?: () => void;
}

export function PromptInput({
  value,
  onChange,
  isLoading,
  onSubmit,
  selectedStyle,
  onClearStyle,
  selectedColor,
  onClearColor,
  selectedRatio,
  onClearRatio,
}: Readonly<PromptInputProps>) {
  const { toast } = useToast();

  useEffect(() => {
    // URL injection removed
  }, [selectedStyle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Don't overthink it, just be yourself"
            rows={3}
            className="text-base bg-transparent border border-input rounded-md p-2 resize-none placeholder:text-muted-foreground text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-center pt-1 pb-[10px]">
            <div className="flex items-center gap-2">
              {selectedStyle && (
                <SelectedStyleBadge
                  selectedStyle={selectedStyle}
                  onClear={onClearStyle}
                />
              )}
              {selectedColor && (
                <SelectedStyleBadge
                  selectedStyle={selectedColor}
                  onClear={onClearColor}
                />
              )}
              {selectedRatio && (
                <SelectedStyleBadge
                  selectedStyle={selectedRatio}
                  onClear={onClearRatio}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
