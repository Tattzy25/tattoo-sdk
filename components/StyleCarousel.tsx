"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TattooOption } from "@/lib/api-types";

interface CarouselItemProps {
  option: TattooOption;
  isSelected: boolean;
  onClick: () => void;
  selectedClassName?: string;
}

function CarouselItem({ option, isSelected, onClick, selectedClassName }: CarouselItemProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Select ${option.label}`}
      data-selected={isSelected ? "true" : undefined}
      className={`
        group relative flex-shrink-0 w-32 flex flex-col items-center gap-3 transition-all duration-200
        ${isSelected ? "scale-[1.05]" : "hover:scale-[1.02]"}
        ${selectedClassName ?? ""}
      `}
    >
      <div className="relative w-32 aspect-[4/5]">
        <Card
          className={`
            w-full h-full p-1.5 overflow-hidden transition-all duration-200
            ${isSelected 
              ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg" 
              : "hover:border-primary/50 hover:shadow-md"
            }
          `}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted/20">
            <Image
              src={option.imageUrl}
              alt={option.label}
              fill
              sizes="(min-width: 1024px) 160px, 128px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Card>
      </div>
      <Badge 
        variant="secondary"
        className={`
          w-full justify-center px-2 py-1.5 text-xs font-semibold tracking-wide border whitespace-nowrap overflow-hidden text-ellipsis
          ${isSelected 
            ? "bg-primary text-primary-foreground border-primary" 
            : "bg-muted text-muted-foreground hover:bg-muted/80 border-transparent"
          }
        `}
      >
        {option.label}
      </Badge>
    </button>
  );
}

interface StyleCarouselProps {
  visible?: boolean;
  options?: TattooOption[]; // Changed from images: string[]
  onSelect?: (option: TattooOption) => void;
  /** Optional externally-controlled selected option ID(s) */
  selected?: string | string[] | null;
  /** Optional class applied to a selected item */
  selectedClassName?: string;
  emptyMessage?: string;
}

export function StyleCarousel({
  visible = false,
  options,
  onSelect,
  selected,
  selectedClassName,
  emptyMessage,
}: Readonly<StyleCarouselProps>) {
  const [internalSelected, setInternalSelected] = React.useState<string | null>(null);

  if (!visible) return null;

  if (!options || options.length === 0) {
    return (
      <div className="mt-4">
        <div className="text-sm text-muted-foreground px-2">
          {emptyMessage ?? "No options available."}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full">
      <div className="overflow-x-auto hide-scrollbar w-full touch-pan-x">
        <div className="flex gap-6 px-4 py-[10px] w-fit mx-auto">
          {options.map((option, idx) => {
            // Special sentinel for divider - currently we don't have this in the config, 
            // but if we did, we'd handle it. 
            // For now, let's assume all options are valid cards.

            const selectedIds = selected ?? internalSelected;

            const handleClick = () => {
              setInternalSelected(option.id);
              onSelect?.(option);
            };

            const isSelected = Array.isArray(selectedIds)
              ? selectedIds.includes(option.id)
              : selectedIds === option.id;

            return (
              <CarouselItem
                key={option.id}
                option={option}
                isSelected={isSelected}
                onClick={handleClick}
                selectedClassName={selectedClassName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
