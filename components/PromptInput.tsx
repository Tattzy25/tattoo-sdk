import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/ModeToggle";
import { TattooStyles } from "@/components/Tattoo-Styles/styles";
import { VibeCheck } from "@/components/VibeCheck";
// TattooPlacements removed from choices

type QualityMode = "performance" | "quality";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  showProviders: boolean;
  onToggleProviders: () => void;
  mode: QualityMode;
  onModeChange: (mode: QualityMode) => void;
  onToggleStyles?: () => void;
  selectedStyle?: string | null;
  onToggleVibe?: () => void;
}

export function PromptInput({
  isLoading,
  onSubmit,
  onToggleStyles,
  selectedStyle,
  onToggleVibe,
}: Readonly<PromptInputProps>) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (selectedStyle) {
      // append a simple placeholder tag when a style is selected
      setInput((prev) =>
        prev.includes(`[style:${selectedStyle}]`)
          ? prev
          : `${prev} [style:${selectedStyle}]`,
      );
    }
  }, [selectedStyle]);

  const handleSubmit = () => {
    if (!isLoading && input.trim()) {
      onSubmit(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSubmit(input);
      }
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="bg-zinc-50 rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here"
            rows={3}
            className="text-base bg-transparent border-none p-0 resize-none placeholder:text-zinc-500 text-[#111111] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center justify-between space-x-2">
              <ModeToggle />
              <TattooStyles onClick={onToggleStyles} />
              <VibeCheck onClick={onToggleVibe} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 rounded-full bg-black flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <Spinner className="w-3 h-3 text-white" />
              ) : (
                <ArrowUp className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
