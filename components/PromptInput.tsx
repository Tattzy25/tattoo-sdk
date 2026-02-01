import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/ModeToggle";
import { SelectedStyleBadge } from "@/components/SelectedStyleBadge/SelectedStyleBadge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  placeholder?: string;
  className?: string;
  disabled?: boolean;
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
  placeholder = "Don't overthink it, just be yourself",
  className,
  disabled,
}: Readonly<PromptInputProps>) {
  const { toast } = useToast();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full mx-auto mb-6 mt-2 text-center">
        <h3 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed tracking-tight font-orbitron italic">
          &nbsp;
        </h3>
      </div>
      <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading || disabled}
            rows={3}
            className="text-base bg-transparent border border-input rounded-md p-2 resize-none placeholder:text-muted-foreground text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-center pt-1 pb-2">
            <div className="flex items-center gap-2">
              <ModeToggle />
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
