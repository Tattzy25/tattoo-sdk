"use client";

import React from "react";
import Image from "next/image";

interface StyleCarouselProps {
  visible?: boolean;
  images?: string[]; // dynamic list of style image URLs
  onSelect?: (url: string) => void;
  emptyMessage?: string;
}

export function StyleCarousel({
  visible = false,
  images,
  onSelect,
  emptyMessage,
}: Readonly<StyleCarouselProps>) {
  const [hiddenMap, setHiddenMap] = React.useState<Record<string, boolean>>({});

  if (!visible) return null;

  if (!images || images.length === 0) {
    return (
      <div className="mt-4">
        <div className="text-sm text-muted-foreground px-2">
          {emptyMessage ?? "No style images available."}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <div className="flex gap-6 px-4 hide-scrollbar">
          {images.map((src, idx) => {
            if (hiddenMap[src]) return null;

            const getLabel = (url: string) => {
              try {
                const path = new URL(url).pathname;
                const raw = path.split("/").pop() || "";
                const name = raw.split(".")[0] || raw;
                return name
                  .replace(/[_-]+/g, " ")
                  .split(" ")
                  .map(
                    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
                  )
                  .join(" ");
              } catch (e) {
                return "";
              }
            };

            const label = getLabel(src);

            return (
              <button
                key={src}
                onClick={() => onSelect?.(src)}
                aria-label={`Select style ${idx + 1}`}
                className="flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-transparent hover:border-gray-300"
              >
                <div className="w-32 aspect-[4/5] relative">
                  <Image
                    src={src}
                    alt={`style-${idx + 1}`}
                    fill
                    sizes="(min-width: 1024px) 160px, 128px"
                    className="object-cover"
                    onError={() => setHiddenMap((s) => ({ ...s, [src]: true }))}
                  />
                </div>
                <div className="px-2 mt-2 text-center text-sm md:text-base font-medium text-muted-foreground">
                  {label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
