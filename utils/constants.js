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
    fiat: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    trading: "0xD73624a0aaa1cc718Bea517A77868666B6082819",
    eatTheDip: "0xD73624a0aaa1cc718Bea517A77868666B6082819",
  },
};

export const STRATEGY_TYPE_ENUM = {
  ACCUMULATION: "ACCUMULATION",
  DCA: "DCA",
  RSI: "RSI",
};

export const graphQueryUrl =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap-ethistanbul";
