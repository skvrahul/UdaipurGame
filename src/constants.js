export const Modes = Object.freeze({
  TRADE: 0,
  TAKE_ONE: 1,
  TAKE_MANY: 2,
  TAKE_CAMELS: 3,
  NONE: -1,
});
export const RESOURCES = Object.freeze({
  camel: "CAMEL",
  gold: "GOLD",
  silver: "SILVER",
  diamond: "DIAMOND",
  silk: "SILK",
  leather: "LEATHER",
  spices: "SPICES",
});
export const RARE_RESOURCES = [
  RESOURCES.diamond,
  RESOURCES.gold,
  RESOURCES.silver,
];
export const MIN_RARE_TRADE = 2;
export const MAX_HAND_SIZE = 7;
export const LARGEST_HERD_BONUS = 5;
