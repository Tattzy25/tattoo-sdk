"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function TattooColors() {
  const [selection, setSelection] = React.useState<
    "Full Color" | "Black & White" | "Other"
  >("Black & White");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="default"
          className="rounded-full flex items-center"
        >
          <span>{selection}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setSelection("Full Color")}>
          Full Color
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelection("Black & White")}>
          Black & White
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelection("Other")}>
          Other - I'll Provide my Color Details in the prompt
        </DropdownMenuItem>
        {selection === "Other" && (
          <DropdownMenuLabel>
            <span className="text-xs">
              Provide Your Color Details in the prompt
            </span>
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
