import { constants } from "../utils/constants";

let network_type = constants.net; // Mainnet 0 and Testnet 1
export const SUPPORTED_CHAINS = [
  network_type === 0 ? constants.chainIdMain : constants.chainIdTest,
];

export const SORT_CRITERIA = {
  AToZ: "name:asc",
  ZToA: "name:desc",
  LowestPrice: "price:asc",
  HighestPrice: "price:desc",
  Latest: "created:desc",
  Oldest: "created:asc",
};

export const TAB_NAMES = {
  AllIngredients: "All Ingredients",
  Pantry: "Pantry",
  Specials: "Specials",
};
