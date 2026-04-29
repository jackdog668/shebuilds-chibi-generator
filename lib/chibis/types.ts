export const CHIBI_STYLES = [
  "kawaii",
  "magical-girl",
  "cottagecore",
  "dark-academia",
  "y2k",
  "noir",
  "fairycore",
  "softgirl",
] as const;
export type ChibiStyle = (typeof CHIBI_STYLES)[number];

export const HAIR_STYLES = [
  "long-flowing",
  "twintails",
  "messy-bun",
  "short-bob",
  "ponytail",
  "curly",
  "braided",
  "pixie",
] as const;
export type HairStyle = (typeof HAIR_STYLES)[number];

export const EXPRESSIONS = [
  "happy",
  "sleepy",
  "blushing",
  "fierce",
  "mischievous",
  "dreamy",
] as const;
export type Expression = (typeof EXPRESSIONS)[number];

export const ACCESSORIES = [
  "none",
  "flower-crown",
  "cat-ears",
  "ribbons",
  "stars",
  "hearts",
  "celestial",
  "vintage-glasses",
] as const;
export type Accessory = (typeof ACCESSORIES)[number];

export interface ChibiState {
  style: ChibiStyle;
  hair: HairStyle;
  expression: Expression;
  accessory: Accessory;
  hairColor: string;
  outfitColor: string;
  bg: string;
  seed: number;
}

export const CHIBI_STYLE_LABELS: Record<ChibiStyle, string> = {
  kawaii: "Kawaii",
  "magical-girl": "Magical Girl",
  cottagecore: "Cottagecore",
  "dark-academia": "Dark Academia",
  y2k: "Y2K",
  noir: "Noir",
  fairycore: "Fairycore",
  softgirl: "Soft Girl",
};

export const CHIBI_STYLE_DESCRIPTIONS: Record<ChibiStyle, string> = {
  kawaii: "Pastel sweetness. Pink cheeks. Sparkles allowed.",
  "magical-girl": "Sailor-era nostalgia. Ribbons and starlight.",
  cottagecore: "Linen apron energy. Honey light. Mushrooms.",
  "dark-academia": "Tweed, candles, ancient libraries.",
  y2k: "Butterfly clips. Frosted gloss. Low-rise everything.",
  noir: "Charcoal and ink. Neon rain. Smoke.",
  fairycore: "Moss, mushrooms, tiny wings, golden hour.",
  softgirl: "Cream and rose. Cardigans. Cinnamon rolls.",
};

export const HAIR_LABELS: Record<HairStyle, string> = {
  "long-flowing": "Long flowing",
  twintails: "Twintails",
  "messy-bun": "Messy bun",
  "short-bob": "Short bob",
  ponytail: "Ponytail",
  curly: "Curly",
  braided: "Braided",
  pixie: "Pixie",
};

export const EXPRESSION_LABELS: Record<Expression, string> = {
  happy: "Happy",
  sleepy: "Sleepy",
  blushing: "Blushing",
  fierce: "Fierce",
  mischievous: "Mischievous",
  dreamy: "Dreamy",
};

export const ACCESSORY_LABELS: Record<Accessory, string> = {
  none: "None",
  "flower-crown": "Flower crown",
  "cat-ears": "Cat ears",
  ribbons: "Ribbons",
  stars: "Stars",
  hearts: "Hearts",
  celestial: "Celestial",
  "vintage-glasses": "Vintage glasses",
};

export const DEFAULT_STATE: ChibiState = {
  style: "kawaii",
  hair: "long-flowing",
  expression: "happy",
  accessory: "flower-crown",
  hairColor: "#D4AF37",
  outfitColor: "#E8A5B8",
  bg: "#F5F0E8",
  seed: 1234,
};
