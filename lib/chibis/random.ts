import {
  ACCESSORIES,
  CHIBI_STYLES,
  EXPRESSIONS,
  HAIR_STYLES,
  type ChibiState,
} from "./types";

const PALETTE = [
  "#D4AF37", "#E8A5B8", "#0F7A5F", "#7A30FF", "#00C8FF",
  "#FFDB40", "#E8C76C", "#FFB6E1", "#5C2E0F", "#1A1A1A",
  "#F5F0E8", "#FFE4F1", "#0A0A0A",
];

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function randomState(prev: ChibiState): ChibiState {
  return {
    style: pick(CHIBI_STYLES),
    hair: pick(HAIR_STYLES),
    expression: pick(EXPRESSIONS),
    accessory: pick(ACCESSORIES),
    hairColor: pick(PALETTE),
    outfitColor: pick(PALETTE),
    bg: prev.bg,
    seed: Math.floor(Math.random() * 9999),
  };
}
