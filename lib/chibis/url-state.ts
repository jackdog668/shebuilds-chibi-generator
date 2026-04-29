import {
  ACCESSORIES,
  CHIBI_STYLES,
  DEFAULT_STATE,
  EXPRESSIONS,
  HAIR_STYLES,
  type Accessory,
  type ChibiState,
  type ChibiStyle,
  type Expression,
  type HairStyle,
} from "./types";

const isHex = (v: string) => /^[0-9A-F]{6}$/i.test(v);

const getOrDefault = <T extends string>(
  list: readonly T[],
  raw: string | null,
  fallback: T,
): T => {
  if (!raw) return fallback;
  const idx = Number(raw);
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) return list[idx];
  return list.includes(raw as T) ? (raw as T) : fallback;
};

export function encodeState(state: ChibiState): string {
  const params = new URLSearchParams({
    s: CHIBI_STYLES.indexOf(state.style).toString(),
    h: HAIR_STYLES.indexOf(state.hair).toString(),
    e: EXPRESSIONS.indexOf(state.expression).toString(),
    a: ACCESSORIES.indexOf(state.accessory).toString(),
    hc: state.hairColor.replace("#", ""),
    oc: state.outfitColor.replace("#", ""),
    bg: state.bg.replace("#", ""),
    x: state.seed.toString(),
  });
  return params.toString();
}

export function decodeState(qs: string | URLSearchParams): ChibiState {
  const params = typeof qs === "string" ? new URLSearchParams(qs) : qs;
  const hc = params.get("hc");
  const oc = params.get("oc");
  const bg = params.get("bg");
  const x = params.get("x");

  return {
    style: getOrDefault<ChibiStyle>(CHIBI_STYLES, params.get("s"), DEFAULT_STATE.style),
    hair: getOrDefault<HairStyle>(HAIR_STYLES, params.get("h"), DEFAULT_STATE.hair),
    expression: getOrDefault<Expression>(EXPRESSIONS, params.get("e"), DEFAULT_STATE.expression),
    accessory: getOrDefault<Accessory>(ACCESSORIES, params.get("a"), DEFAULT_STATE.accessory),
    hairColor: hc && isHex(hc) ? `#${hc.toUpperCase()}` : DEFAULT_STATE.hairColor,
    outfitColor: oc && isHex(oc) ? `#${oc.toUpperCase()}` : DEFAULT_STATE.outfitColor,
    bg: bg && isHex(bg) ? `#${bg.toUpperCase()}` : DEFAULT_STATE.bg,
    seed: x ? Math.max(0, Math.min(9999, Number(x) | 0)) : DEFAULT_STATE.seed,
  };
}
