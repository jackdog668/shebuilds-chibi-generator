import type { ChibiState } from "./types";

export interface Preset {
  id: string;
  name: string;
  state: ChibiState;
}

export const PRESETS: Preset[] = [
  {
    id: "starlight",
    name: "Starlight",
    state: {
      style: "magical-girl",
      hair: "twintails",
      expression: "dreamy",
      accessory: "stars",
      hairColor: "#E8A5B8",
      outfitColor: "#7A30FF",
      bg: "#0A0A0A",
      seed: 1234,
    },
  },
  {
    id: "honey-cottage",
    name: "Honey Cottage",
    state: {
      style: "cottagecore",
      hair: "messy-bun",
      expression: "happy",
      accessory: "flower-crown",
      hairColor: "#8B5A2B",
      outfitColor: "#0F7A5F",
      bg: "#F5F0E8",
      seed: 2412,
    },
  },
  {
    id: "library-ghost",
    name: "Library Ghost",
    state: {
      style: "dark-academia",
      hair: "long-flowing",
      expression: "fierce",
      accessory: "vintage-glasses",
      hairColor: "#1A1A1A",
      outfitColor: "#5C2E0F",
      bg: "#0A0A0A",
      seed: 909,
    },
  },
  {
    id: "candy-shop",
    name: "Candy Shop",
    state: {
      style: "kawaii",
      hair: "curly",
      expression: "blushing",
      accessory: "hearts",
      hairColor: "#FFB6E1",
      outfitColor: "#F5F0E8",
      bg: "#FFE4F1",
      seed: 4242,
    },
  },
  {
    id: "y2k-mall",
    name: "Y2K Mall",
    state: {
      style: "y2k",
      hair: "short-bob",
      expression: "mischievous",
      accessory: "ribbons",
      hairColor: "#00C8FF",
      outfitColor: "#FFDB40",
      bg: "#F5F0E8",
      seed: 1999,
    },
  },
  {
    id: "neon-noir",
    name: "Neon Noir",
    state: {
      style: "noir",
      hair: "pixie",
      expression: "fierce",
      accessory: "none",
      hairColor: "#0A0A0A",
      outfitColor: "#7A30FF",
      bg: "#0A0A0A",
      seed: 808,
    },
  },
  {
    id: "moss-fae",
    name: "Moss Fae",
    state: {
      style: "fairycore",
      hair: "braided",
      expression: "dreamy",
      accessory: "celestial",
      hairColor: "#D4AF37",
      outfitColor: "#0F7A5F",
      bg: "#F5F0E8",
      seed: 3737,
    },
  },
  {
    id: "soft-cardigan",
    name: "Soft Cardigan",
    state: {
      style: "softgirl",
      hair: "ponytail",
      expression: "sleepy",
      accessory: "cat-ears",
      hairColor: "#E8C76C",
      outfitColor: "#FFE4F1",
      bg: "#F5F0E8",
      seed: 1212,
    },
  },
];
