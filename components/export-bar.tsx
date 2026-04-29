"use client";

import { useState } from "react";
import { Copy, Download, Image as ImageIcon, Link2, Check } from "lucide-react";
import { dicebearUrl, dicebearPngUrl } from "@/lib/chibis/dicebear";
import { buildPrompt } from "@/lib/chibis/prompt-builder";
import { encodeState } from "@/lib/chibis/url-state";
import type { ChibiState } from "@/lib/chibis/types";
import { BrandButton } from "./brand-button";

interface Props {
  state: ChibiState;
}

type Status = "idle" | "working" | "done" | "error";

export function ExportBar({ state }: Props) {
  const [promptStatus, setPromptStatus] = useState<Status>("idle");
  const [svgStatus, setSvgStatus] = useState<Status>("idle");
  const [pngStatus, setPngStatus] = useState<Status>("idle");
  const [shareStatus, setShareStatus] = useState<Status>("idle");

  async function withStatus(
    setter: (s: Status) => void,
    fn: () => Promise<void> | void,
  ) {
    setter("working");
    try {
      await fn();
      setter("done");
      setTimeout(() => setter("idle"), 1600);
    } catch (e) {
      console.error(e);
      setter("error");
      setTimeout(() => setter("idle"), 2400);
    }
  }

  const handleCopyPrompt = () =>
    withStatus(setPromptStatus, async () => {
      const prompt = buildPrompt(state);
      await navigator.clipboard.writeText(prompt.full);
    });

  const handleDownloadSVG = () =>
    withStatus(svgStatus !== "working" ? setSvgStatus : () => {}, async () => {
      const url = dicebearUrl(state, 1024);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`SVG fetch failed: ${res.status}`);
      const svg = await res.text();
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      triggerDownload(blob, `shebuilds-chibi-${state.style}-${state.seed}.svg`);
    });

  const handleDownloadPNG = () =>
    withStatus(setPngStatus, async () => {
      const url = dicebearPngUrl(state, 1024);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`PNG fetch failed: ${res.status}`);
      const blob = await res.blob();
      triggerDownload(blob, `shebuilds-chibi-${state.style}-${state.seed}.png`);
    });

  const handleShare = () =>
    withStatus(setShareStatus, async () => {
      const qs = encodeState(state);
      const url = `${window.location.origin}${window.location.pathname}?${qs}`;
      window.history.replaceState({}, "", `?${qs}`);
      await navigator.clipboard.writeText(url);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <BrandButton variant="gold" onClick={handleCopyPrompt} disabled={promptStatus === "working"}>
        <StatusLine status={promptStatus} icon={<Copy className="h-4 w-4" />} idleLabel="Copy AI prompt" doneLabel="Copied" />
      </BrandButton>

      <BrandButton variant="outline" onClick={handleDownloadPNG} disabled={pngStatus === "working"}>
        <StatusLine status={pngStatus} icon={<ImageIcon className="h-4 w-4" />} idleLabel="PNG · 1024" />
      </BrandButton>

      <BrandButton variant="outline" onClick={handleDownloadSVG} disabled={svgStatus === "working"}>
        <StatusLine status={svgStatus} icon={<Download className="h-4 w-4" />} idleLabel="SVG" />
      </BrandButton>

      <BrandButton variant="ghost" onClick={handleShare} disabled={shareStatus === "working"}>
        <StatusLine status={shareStatus} icon={<Link2 className="h-4 w-4" />} idleLabel="Copy link" doneLabel="Copied" />
      </BrandButton>
    </div>
  );
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function StatusLine({
  status,
  icon,
  idleLabel,
  doneLabel = "Saved",
}: {
  status: Status;
  icon: React.ReactNode;
  idleLabel: string;
  doneLabel?: string;
}) {
  if (status === "working") {
    return (
      <>
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Working…</span>
      </>
    );
  }
  if (status === "done") {
    return (
      <>
        <Check className="h-4 w-4" />
        <span>{doneLabel}</span>
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        {icon}
        <span>Try again</span>
      </>
    );
  }
  return (
    <>
      {icon}
      <span>{idleLabel}</span>
    </>
  );
}
