import Web3 from "web3";
import { constants } from "./utils/constants";
import provider from "./provider";

var web3;

if (typeof window !== "undefined") {
  if (typeof window.web3 !== "undefined") {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(window.web3.currentProvider);
  } else {
    if (provider.connected) {
      web3 = new Web3(provider);
    } else {
      // console.log('using infura provider')
      const infura =
        constants.net === 1
          ? `https://rpc-mumbai.maticvigil.com`
          : `https://polygon-mainnet.g.alchemy.com/v2/38R9Vnxi-6UPne8ACF4k4radrS8-6UJ1`;

      web3 = new Web3(new Web3.providers.HttpProvider(infura));
    }
  }
}
export default web3;
