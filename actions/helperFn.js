import Web3 from "web3";

export const fromWei = (input, decimals) => {
  if (decimals === "6") {
    return parseFloat(Web3.utils.fromWei(input, "Mwei")).toFixed(2);
  } else {
    return parseFloat(Web3.utils.fromWei(input, "ether")).toFixed(2);
  }
};

export const toWei = (input, decimals) => {
  if (decimals === "6") {
    return Web3.utils.toWei(input, "Mwei");
  } else {
    return Web3.utils.toWei(input, "ether");
  }
};
