import { constants } from "../utils/constants";
import web3 from "../web3";
//Check wallet available
//Returns boolean true or false
export const checkWalletAvailable = () => {
  if (typeof window.ethereum !== "undefined") {
    // console.log('Yes available');

    if (window.ethereum) {
      // console.log('Yes metamask available');
      return true;
    } else {
      // console.log('No, Not available');
      return false;
    }
  } else {
    return false;
  }
};

//Check correct network
//Returns boolean true or false
export const checkCorrectNetwork = async () => {
  let chainID;
  if (window.ethereum) {
    const id = await window.ethereum.networkVersion;
    if (id) {
      chainID = id;
    } else {
      chainID = await web3.eth.getChainId();
    }
  } else {
    chainID = await web3.eth.getChainId();
  }

  let networkId;
  if (constants.net === 0) {
    networkId = constants.chainIdMain.toString();
  } else {
    networkId = constants.chainIdTest.toString();
  }
  console.log(chainID);
  console.log(networkId);
  if (chainID && networkId && parseInt(chainID) === parseInt(networkId)) {
    //console.log('BSC');
    return true;
  } else {
    //console.log('Other Network');
    return false;
  }
};

//Get User Address from Web3
export const getUserAddress = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const accountAddress = accounts[0];
  return accountAddress;
};

export const checkWalletCase = async () => {
  let actualCase = -1;
  let walletStatus = await checkWalletAvailable();

  if (walletStatus) {
    const networkStatus = await checkCorrectNetwork();
    if (networkStatus) {
      actualCase = 2;
      return actualCase;
    } else {
      actualCase = 1;
      return actualCase;
    }
  } else {
    actualCase = 0;
    return actualCase;
  }
};

//Get Balance in Wei
export const toWei = async (amount) => {
  const weiAmount = await web3.utils.toWei(amount.toString(), "ether");
  return weiAmount;
};
//Get Balance from Wei
export const fromWei = async (amount) => {
  const etherAmount = await web3.utils.fromWei(amount.toString(), "ether");
  return etherAmount;
};
