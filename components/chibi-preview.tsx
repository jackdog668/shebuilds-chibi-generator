"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { dicebearUrl } from "@/lib/chibis/dicebear";
import { buildPrompt } from "@/lib/chibis/prompt-builder";
import {
  ACCESSORY_LABELS,
  CHIBI_STYLE_LABELS,
  EXPRESSION_LABELS,
  HAIR_LABELS,
  type ChibiState,
} from "@/lib/chibis/types";
import { cn } from "@/lib/cn";

interface Props {
  state: ChibiState;
}

type ViewMode = "vibe" | "prompt";

export function ChibiPreview({ state }: Props) {
  const [view, setView] = useState<ViewMode>("vibe");
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => dicebearUrl(state, 600), [state]);
  const prompt = useMemo(() => buildPrompt(state), [state]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("[copy-prompt]", e);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <ViewToggle value={view} onChange={setView} />
      </div>

      {view === "vibe" ? (
        <motion.div
          key={url}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-full overflow-hidden rounded-md shadow-elevated ring-1 ring-cream/10"
          style={{ background: state.bg }}
          aria-label={`Vibe preview for ${CHIBI_STYLE_LABELS[state.style]} chibi`}
        >
          <CornerBrackets />
          {/* Lorelei avatars are CC0 cute illustrated heads — we use them as a
              vibe placeholder. Production output comes from the AI prompt below. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={`${CHIBI_STYLE_LABELS[state.style]} chibi vibe preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-3 left-3 right-3 rounded-md bg-bg/70 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-muted">
                Vibe preview · prompt-driven AI delivers final art
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={prompt.short}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-md border border-cream/10 bg-surface/40 p-6 backdrop-blur-sm"
        >
          <CornerBrackets />

          <div className="mb-5">
            <p className="label mb-2">Short brief</p>
            <p className="font-display text-xl leading-snug text-cream">
              {prompt.short}
            </p>
          </div>

          <div className="gold-rule mb-5" />

          <div className="mb-5">
            <p className="label mb-2">Full prompt — paste into Midjourney, Nano Banana, SD</p>
            <pre className="whitespace-pre-wrap rounded-md bg-bg/60 p-4 font-mono text-[12px] leading-relaxed text-cream-muted">
              {prompt.full}
            </pre>
          </div>

          <div className="mb-5">
            <p className="label mb-2">Negative</p>
            <pre className="whitespace-pre-wrap rounded-md bg-bg/60 p-4 font-mono text-[11px] leading-relaxed text-cream-muted">
              {prompt.negative}
            </pre>
          </div>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream transition-all hover:bg-gold/20"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
                Copy full prompt
              </>
            )}
          </button>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag label={CHIBI_STYLE_LABELS[state.style]} />
            <Tag label={`${HAIR_LABELS[state.hair]} hair`} />
            <Tag label={`${EXPRESSION_LABELS[state.expression]} expression`} />
            {state.accessory !== "none" && <Tag label={ACCESSORY_LABELS[state.accessory]} />}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  const modes: { id: ViewMode; label: string }[] = [
    { id: "vibe", label: "Vibe" },
    { id: "prompt", label: "Prompt" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Preview mode"
      className="inline-flex rounded-full border border-cream/10 bg-surface/40 p-1"
    >
      {modes.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m.id)}
            className={cn(
              "rounded-full px-4 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-all",
              active
                ? "bg-gold/15 text-cream shadow-gold-soft"
                : "text-cream-muted hover:text-cream",
            )}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cream/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream-muted">
      {label}
    </span>
  );
}

function CornerBrackets() {
  const arm = "absolute h-4 w-4 border-gold pointer-events-none z-10";
  return (
    <>
      <span className={`${arm} top-2 left-2 border-t border-l`} />
      <span className={`${arm} top-2 right-2 border-t border-r`} />
      <span className={`${arm} bottom-2 left-2 border-b border-l`} />
      <span className={`${arm} bottom-2 right-2 border-b border-r`} />
    </>
  );
}
