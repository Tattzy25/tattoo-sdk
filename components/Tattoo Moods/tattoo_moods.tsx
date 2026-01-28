"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

type MoodOption =
  | "Dark & Mysterious"
  | "Bold & Rebellious"
  | "Elegant & Feminine"
  | "Spiritual & Mystical"
  | "Vintage & Nostalgic"
  | "Nature & Organic"
  | "Artistic & Abstract"
  | "Powerful & Warrior"
  | "Romantic & Sentimental"
  | "Minimalist & Modern"
  | "Cyberpunk & Futuristic"
  | "Tribal & Indigenous"
  | "Religious & Sacred"
  | "Horror & Gore"
  | "Retro & 80s/90s"
  | "Ocean & Maritime"
  | "Celestial & Cosmic"
  | "Steampunk & Industrial"
  | "Fantasy & Mythological"
  | "Urban & Street Art"
  | "Other";

export function TattooMoods() {
  const [mood, setMood] = React.useState<MoodOption>("Urban & Street Art");

  const options: MoodOption[] = [
    "Dark & Mysterious",
    "Bold & Rebellious",
    "Elegant & Feminine",
    "Spiritual & Mystical",
    "Vintage & Nostalgic",
    "Nature & Organic",
    "Artistic & Abstract",
    "Powerful & Warrior",
    "Romantic & Sentimental",
    "Minimalist & Modern",
    "Cyberpunk & Futuristic",
    "Tribal & Indigenous",
    "Religious & Sacred",
    "Horror & Gore",
    "Retro & 80s/90s",
    "Ocean & Maritime",
    "Celestial & Cosmic",
    "Steampunk & Industrial",
    "Fantasy & Mythological",
    "Urban & Street Art",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="default"
          className="rounded-full flex items-center"
        >
          <span className="truncate max-w-[10rem]">{mood}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-0">
        <ScrollArea className="h-48 w-56">
          <div className="p-1">
            {options.map((opt) => (
              <DropdownMenuItem key={opt} onClick={() => setMood(opt)}>
                {opt}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => setMood("Other")}>
              Other - I'll Provide my Mood/Theme Details in the prompt
            </DropdownMenuItem>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
