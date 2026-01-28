"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function TattooAspectRatio() {
  const [ratio, setRatio] = React.useState<"1:1" | "16:9" | "9:16" | "4:5">(
    "1:1",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="default"
          className="rounded-full flex items-center"
        >
          <span>{ratio}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setRatio("1:1")}>1:1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRatio("16:9")}>
          16:9
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRatio("9:16")}>
          9:16
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRatio("4:5")}>4:5</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
