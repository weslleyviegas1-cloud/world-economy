import emblem from "@/assets/world-economy-emblem.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "stacked" | "inline" | "emblem";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  subtitle?: boolean;
}

const emblemSize = { sm: "h-10", md: "h-14", lg: "h-24", xl: "h-36 sm:h-44" };
const titleSize = { sm: "text-base", md: "text-xl", lg: "text-3xl", xl: "text-4xl sm:text-5xl" };
const subSize = { sm: "text-[9px]", md: "text-[11px]", lg: "text-sm", xl: "text-sm sm:text-base" };

/** Official WORLD ECONOMY logo: crowned globe with golden laurels + chrome wordmark. */
export function Logo({ variant = "inline", size = "md", className, subtitle = true }: LogoProps) {
  const img = (
    <img
      src={emblem}
      alt="WORLD ECONOMY"
      width={864}
      height={786}
      className={cn(emblemSize[size], "w-auto shrink-0 animate-logo-glow select-none")}
      draggable={false}
    />
  );
  if (variant === "emblem") return <span className={className}>{img}</span>;

  const text = (
    <div className={cn("min-w-0 leading-none", variant === "stacked" && "text-center")}>
      <div className={cn("font-display tracking-wide text-chrome", titleSize[size])}>
        {variant === "stacked" ? (
          <>
            WORLD
            <br />
            ECONOMY
          </>
        ) : (
          <>
            WORLD
            <br />
            ECONOMY
          </>
        )}
      </div>
      {subtitle && (
        <div className={cn("mt-1 font-condensed font-medium text-muted-foreground", subSize[size])}>
          Simulação Global de Países
        </div>
      )}
    </div>
  );

  return variant === "stacked" ? (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {img}
      {text}
    </div>
  ) : (
    <div className={cn("flex items-center gap-2.5", className)}>
      {img}
      {text}
    </div>
  );
}
