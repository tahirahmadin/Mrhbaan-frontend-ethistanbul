// 0 mainnet, 1 testnet
let network_type = 1;

export const constants = {
  highlighColor: "rgba(130, 71, 229, 0.3)",
  buttonColor: "rgba(130, 71, 229, 0.7)",
  highlighColorDark: "#7540CF",
  baseColorLight: "#0C0D10",
  textDark: "black",
  textLight: "#f9f9f9",
  net: network_type,
  chainIdMain: 137,
  chainIdMainInHex: "0x89",
  chainIdTest: 80001,
  chainIdTestInHex: "0x13881",
  backend_url: "",
  backend_dev: "http://localhost:5004",
  contracts: {
    fiat: "0xE118429D095de1a93951c67D04B523fE5cbAB62c",
    accumulation: "0x319961073dA3983d46b0231913e00e73773cc7cC",
    dca: "0x5FB1144544Bb46DD1179342BD6b3f4d2bF55dA75",
  },
};

export const STRATEGY_TYPE_ENUM = {
  ACCUMULATION: "ACCUMULATION",
  DCA: "DCA",
  RSI: "RSI",
};

export const graphQueryUrl =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap";
