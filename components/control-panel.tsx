"use client";

import { Shuffle } from "lucide-react";
import {
  ACCESSORIES,
  ACCESSORY_LABELS,
  CHIBI_STYLES,
  CHIBI_STYLE_DESCRIPTIONS,
  CHIBI_STYLE_LABELS,
  EXPRESSIONS,
  EXPRESSION_LABELS,
  HAIR_LABELS,
  HAIR_STYLES,
  type Accessory,
  type ChibiState,
  type ChibiStyle,
  type Expression,
  type HairStyle,
} from "@/lib/chibis/types";
import { ColorSwatch } from "./color-swatch";
import { cn } from "@/lib/cn";

interface Props {
  state: ChibiState;
  onChange: (next: ChibiState) => void;
  onRandom: () => void;
}

export function ControlPanel({ state, onChange, onRandom }: Props) {
  const set = <K extends keyof ChibiState>(key: K, value: ChibiState[K]) =>
    onChange({ ...state, [key]: value });

  return (
    <div className="space-y-8">
      <Section label="Style">
        <div className="grid grid-cols-2 gap-1.5">
          {CHIBI_STYLES.map((s) => (
            <Chip
              key={s}
              active={state.style === s}
              onClick={() => set("style", s as ChibiStyle)}
              label={CHIBI_STYLE_LABELS[s]}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {CHIBI_STYLE_DESCRIPTIONS[state.style]}
        </p>
      </Section>

      <Section label="Hair">
        <div className="grid grid-cols-2 gap-1.5">
          {HAIR_STYLES.map((h) => (
            <Chip
              key={h}
              active={state.hair === h}
              onClick={() => set("hair", h as HairStyle)}
              label={HAIR_LABELS[h]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Expression">
        <div className="grid grid-cols-2 gap-1.5">
          {EXPRESSIONS.map((e) => (
            <Chip
              key={e}
              active={state.expression === e}
              onClick={() => set("expression", e as Expression)}
              label={EXPRESSION_LABELS[e]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Accessory">
        <div className="grid grid-cols-2 gap-1.5">
          {ACCESSORIES.map((a) => (
            <Chip
              key={a}
              active={state.accessory === a}
              onClick={() => set("accessory", a as Accessory)}
              label={ACCESSORY_LABELS[a]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Colors">
        <ColorSwatch label="Hair" value={state.hairColor} onChange={(v) => set("hairColor", v)} />
        <ColorSwatch label="Outfit" value={state.outfitColor} onChange={(v) => set("outfitColor", v)} />
        <ColorSwatch label="Background" value={state.bg} onChange={(v) => set("bg", v)} />
      </Section>

      <button
        type="button"
        onClick={onRandom}
        className="group flex w-full items-center justify-between rounded-full border border-cream/15 px-5 py-3 text-sm transition-all hover:border-gold/60 hover:bg-gold/5"
      >
        <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-cream-muted group-hover:text-cream">
          Surprise me
        </span>
        <Shuffle className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="label mb-3">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border text-left transition-all",
        size === "sm" ? "px-3 py-2 text-[12px]" : "px-3 py-2.5 text-sm",
        active
          ? "border-gold/60 bg-gold/10 text-cream shadow-gold-soft"
          : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
      )}
    >
      <div className={cn("font-display leading-tight", size === "sm" ? "text-sm" : "text-base")}>
        {label}
      </div>
    </button>
  );
}
