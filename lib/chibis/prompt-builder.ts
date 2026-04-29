import {
  ACCESSORY_LABELS,
  CHIBI_STYLE_DESCRIPTIONS,
  CHIBI_STYLE_LABELS,
  EXPRESSION_LABELS,
  HAIR_LABELS,
  type ChibiState,
} from "./types";

const STYLE_PROMPT_BITS: Record<string, string> = {
  kawaii: "kawaii pastel aesthetic, soft pink cheeks, sparkles, ultra-cute",
  "magical-girl": "magical girl aesthetic, sailor moon era, ribbons, starlight, transformation outfit",
  cottagecore: "cottagecore aesthetic, linen apron, golden hour, mushrooms, pressed flowers",
  "dark-academia": "dark academia aesthetic, tweed blazer, candlelit library, ink and parchment",
  y2k: "Y2K aesthetic, butterfly clips, frosted lipgloss, low-rise denim, holographic accents",
  noir: "neon noir aesthetic, charcoal palette, neon rain reflections, cinematic shadow",
  fairycore: "fairycore aesthetic, moss, mushrooms, tiny iridescent wings, golden hour",
  softgirl: "soft girl aesthetic, oversized cardigan, cream and rose palette, cinnamon roll vibes",
};

const NEGATIVE = "no text, no watermark, no logo, no extra fingers, no extra limbs, clean background";

export interface BuiltPrompt {
  short: string;
  full: string;
  negative: string;
}

export function buildPrompt(state: ChibiState): BuiltPrompt {
  const styleBits = STYLE_PROMPT_BITS[state.style] ?? CHIBI_STYLE_DESCRIPTIONS[state.style];
  const hair = HAIR_LABELS[state.hair].toLowerCase();
  const expression = EXPRESSION_LABELS[state.expression].toLowerCase();
  const accessory = state.accessory === "none" ? "" : `, ${ACCESSORY_LABELS[state.accessory].toLowerCase()}`;

  const short = `Chibi character, ${CHIBI_STYLE_LABELS[state.style]} aesthetic, ${hair} hair, ${expression} expression${accessory}.`;

  const full = [
    `Chibi character illustration, full body, big head small body, kawaii proportions.`,
    `Style: ${styleBits}.`,
    `Hair: ${hair}, color ${state.hairColor}.`,
    `Outfit accent color: ${state.outfitColor}.`,
    `Expression: ${expression}.`,
    state.accessory !== "none" ? `Accessory: ${ACCESSORY_LABELS[state.accessory].toLowerCase()}.` : null,
    `Background: solid ${state.bg}, soft vignette.`,
    `Centered composition, 1:1 square, sticker-ready cutout, crisp lineart, cel shading.`,
    `High detail face, expressive eyes, anime-influenced, but original character.`,
  ]
    .filter(Boolean)
    .join(" ");

  return { short, full, negative: NEGATIVE };
}
