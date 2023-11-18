import Web3 from "web3";
import ERC20RG from "../abi/ERC20RG.json";
import SleepSwapMasterChef from "../abi/SleepSwapMasterChef.json";

import { constants } from "../utils/constants";

const web3Instance = (provider) => {
  if (provider === "unavailable") {
    const rpcProvider =
      "https://polygon-mainnet.g.alchemy.com/v2/38R9Vnxi-6UPne8ACF4k4radrS8-6UJ1";
    return new Web3(new Web3.providers.HttpProvider(rpcProvider));
  } else {
    return new Web3(provider);
  }
};

export const tokenInstance = (provider = "unavailable") => {
  try {
    var web3 = web3Instance(provider);
    var tokenContract = new web3.eth.Contract(
      ERC20RG,
      constants.contracts.fiat
    );

    return tokenContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const tradingInstance = (provider = "unavailable") => {
  try {
    var web3 = web3Instance(provider);
    var tradingContract = new web3.eth.Contract(
      SleepSwapMasterChef,
      constants.contracts.trading
    );

    return tradingContract;
  } catch (err) {
    console.log(err);
    return null;
  }
};
