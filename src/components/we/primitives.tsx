import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export function Flag({ code, className, alt }: { code: string; className?: string; alt?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w160/${code}.png`}
      alt={alt ?? code.toUpperCase()}
      loading="lazy"
      className={cn("h-6 w-9 shrink-0 rounded-[3px] object-cover shadow-md ring-1 ring-border", className)}
    />
  );
}

export function Panel({
  children, className, delay = 0, glow, as: Tag = "section",
}: { children: ReactNode; className?: string; delay?: number; glow?: boolean; as?: "section" | "div" }) {
  return (
    <Tag className={cn("panel animate-rise", glow && "panel-glow", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function PanelHeader({ title, icon: Icon, action, className }: { title: string; icon?: LucideIcon; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 items-center justify-between gap-3 border-b border-border/60 px-4 py-3", className)}>
      <h2 className="flex min-w-0 items-center gap-2 font-condensed text-lg font-semibold tracking-wide">
        {Icon && <Icon className="h-5 w-5 shrink-0 text-primary-glow" />}
        <span className="truncate">{title}</span>
      </h2>
      {action}
    </div>
  );
}

export function SeeAll({ children = "Ver Todas", onClick }: { children?: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="pressable flex shrink-0 items-center gap-1 text-xs font-medium text-primary-glow hover:text-foreground">
      {children} <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}

export function StatCard({
  icon: Icon, label, value, tone = "blue", hint, delay = 0,
}: { icon: LucideIcon; label: string; value: ReactNode; tone?: "blue" | "green" | "gold" | "violet"; hint?: ReactNode; delay?: number }) {
  const tones = {
    blue: "text-primary-glow bg-primary/15 ring-primary/40",
    green: "text-success bg-success/15 ring-success/40",
    gold: "text-gold bg-gold/15 ring-gold/40",
    violet: "text-chart-4 bg-chart-4/15 ring-chart-4/40",
  };
  return (
    <Panel delay={delay} className="group flex min-w-0 items-center gap-3 p-3 transition-colors hover:border-primary/60 sm:p-4">
      <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 transition-transform group-hover:scale-110 sm:h-12 sm:w-12", tones[tone])}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs text-muted-foreground sm:text-sm">{label}</div>
        <div className="truncate font-condensed text-xl font-bold sm:text-2xl">{value}</div>
        {hint && <div className="truncate text-xs">{hint}</div>}
      </div>
    </Panel>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold", className)}>
      <FlaskConical className="h-3 w-3" /> Demonstração
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block h-2 w-2 shrink-0 rounded-full bg-success animate-live", className)} />;
}

export function QuickTile({ icon: Icon, label, onClick, delay = 0 }: { icon: LucideIcon; label: string; onClick?: () => void; delay?: number }) {
  return (
    <button
      onClick={onClick}
      style={{ "--d": `${delay}ms` } as CSSProperties}
      className="panel pressable animate-rise flex min-h-20 flex-col items-center justify-center gap-1.5 p-2 text-center text-xs font-medium hover:border-primary/60 hover:bg-accent"
    >
      <Icon className="h-6 w-6 text-foreground" />
      <span className="leading-tight">{label}</span>
    </button>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  // Minecraft head via public skin renderer; falls back to initials background.
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-xl bg-navy ring-1 ring-border", className)}>
      <img
        src={`https://mc-heads.net/avatar/${encodeURIComponent(name)}/128`}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover [image-rendering:pixelated]"
      />
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <span className={cn("inline-block h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary-glow animate-spin-slow", className)} />;
}
