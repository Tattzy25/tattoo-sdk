import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/ModeToggle";
import { SelectedStyleBadge } from "@/components/SelectedStyleBadge/SelectedStyleBadge";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useToast } from "@/hooks/use-toast";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  selectedStyle?: string | null;
  onClearStyle?: () => void;
  selectedColor?: string | null;
  onClearColor?: () => void;
  selectedRatio?: string | null;
  onClearRatio?: () => void;
}

export function PromptInput({
  isLoading,
  onSubmit,
  selectedStyle,
  onClearStyle,
  selectedColor,
  onClearColor,
  selectedRatio,
  onClearRatio,
}: Readonly<PromptInputProps>) {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // URL injection removed
  }, [selectedStyle]);

  const validateAndSubmit = () => {
    if (isLoading) return;

    if (!selectedStyle) {
        toast({
            title: "Style required",
            description: "Please select a style to proceed.",
            variant: "destructive",
        });
        return;
    }

    if (!selectedColor) {
        toast({
            title: "Color required",
            description: "Please select a color/vibe to proceed.",
            variant: "destructive",
        });
        return;
    }

    if (!selectedRatio) {
        toast({
            title: "Size required",
            description: "Please select a size (aspect ratio) to proceed.",
            variant: "destructive",
        });
        return;
    }

    if (input.trim().length < 10) {
        toast({
            title: "More detail needed",
            description: "Please enter at least 10 characters for your answer.",
            variant: "destructive",
        });
        return;
    }

    onSubmit(input);
  };

  const handleSubmit = () => {
    validateAndSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      validateAndSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-zinc-50 rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <div className="w-full px-2 mx-auto mb-6 mt-2 text-center">
            <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 leading-relaxed tracking-tight font-orbitron italic">
              &quot;If the ink could speak and looked you dead in the eyes — WHO THE FUCK ARE YOU, REALLY? — what would you say?&quot;
            </h3>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Don't overthink it, just be yourself"
            rows={3}
            className="text-base bg-transparent border-none p-0 resize-none placeholder:text-zinc-500 text-[#111111] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-between pt-1 pb-[10px]">
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
            <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
              <LiquidMetalButton
                label={isLoading ? "INKING..." : "INK ME UP"}
                onClick={handleSubmit}
                viewMode="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
