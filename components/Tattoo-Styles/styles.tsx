import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

interface TattooStylesProps {
  onClick?: () => void;
  isActive?: boolean;
}

export function TattooStyles({ onClick, isActive }: Readonly<TattooStylesProps>) {
  return (
    <LiquidMetalButton
      label="Styles"
      onClick={onClick}
      viewMode="text"
      animate={isActive}
      className={isActive ? "rounded-[100px] shadow-[0_0_8px_rgba(255,255,255,0.9)] border border-white" : ""}
    />
  );
}
