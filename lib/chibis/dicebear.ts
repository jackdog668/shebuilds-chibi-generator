import type { ChibiState } from "./types";

const STYLE_TO_BACKDROP: Record<string, string[]> = {
  kawaii: ["FFE4F1", "FFDDEE", "FFCCE5"],
  "magical-girl": ["7A30FF", "00C8FF", "FFB6E1"],
  cottagecore: ["F5F0E8", "E8C76C", "0F7A5F"],
  "dark-academia": ["1A1A1A", "5C2E0F", "8B5A2B"],
  y2k: ["00C8FF", "FFDB40", "FFB6E1"],
  noir: ["0A0A0A", "1A1A1A", "7A30FF"],
  fairycore: ["F5F0E8", "0F7A5F", "D4AF37"],
  softgirl: ["FFE4F1", "F5F0E8", "FFDB40"],
};

const seedString = (state: ChibiState) =>
  [state.style, state.hair, state.expression, state.accessory, state.seed].join("-");

/**
 * Build a DiceBear `lorelei` SVG URL. Free, no key, CC0 art, commercial OK.
 *
 * Style/hair/expression/accessory shape the seed → drives lorelei's internal
 * variation. Color params are passed where lorelei accepts them.
 */
export function dicebearUrl(state: ChibiState, size = 400): string {
  const seed = encodeURIComponent(seedString(state));
  const bg = state.bg.replace("#", "");
  const backdrops = STYLE_TO_BACKDROP[state.style] ?? ["F5F0E8"];
  const backgroundColor = [bg, ...backdrops].join(",");

  // Lorelei derives features from seed — hairColor flows through the AI prompt
  // (the actual product), not the placeholder.
  const params = new URLSearchParams({
    seed,
    backgroundColor,
    size: size.toString(),
    radius: "12",
  });
  return `https://api.dicebear.com/9.x/lorelei/svg?${params.toString()}`;
}

export function dicebearPngUrl(state: ChibiState, size = 1024): string {
  return dicebearUrl(state, size).replace("/svg?", "/png?");
}
