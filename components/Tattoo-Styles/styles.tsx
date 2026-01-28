import { Button } from "@/components/ui/button";

interface TattooStylesProps {
  onClick?: () => void;
}

export function TattooStyles({ onClick }: Readonly<TattooStylesProps>) {
  return (
    <Button
      variant="default"
      size="default"
      className="rounded-full"
      onClick={onClick}
    >
      Styles
    </Button>
  );
}
