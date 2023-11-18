import { ethers, FixedNumber } from "ethers";
import ERC20RG from "../abi/ERC20RG.json";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import web3 from "../web3";

// helper function

class EthersServiceProvider {
  provider;
  currentAccount;
  web3AuthInstance;

  maticContractInstance;
  gameContractAddrInstance;
  stakingContractInstance;

  constructor() {}

  async getProvider() {
    const clientId =
      "BIOMhgpLCKLpoPjcz0uLHvI8Uul1AknA2CT6gvCbR7vF3cl4ryN6Sm8RJ3Hxp3gnKLlmM06N4XGqXRDuKR697eQ"; // get from https://dashboard.web3auth.io

    const web3authInstance = new Web3Auth({
      clientId,
      uiConfig: {
        theme: "light",
        loginMethodsOrder: ["google", "facebook", "twitter", "apple"],
        appLogo:
          "https://icodrops.com/wp-content/uploads/2021/11/OneRare_logo.jpeg",
      },
      defaultLanguage: "en",
      modalZIndex: "99998",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x89",
        rpcTarget: "https://polygon-rpc.com/",
      },
    });

    await web3authInstance.initModal();
    this.web3AuthInstance = web3authInstance;
    this.provider = web3authInstance.provider;
    return this.provider;
  }

  async setCurrentAccount(address) {
    this.currentAccount = address;
  }
  async setCurrentProvider(mainProvider) {
    this.provider = mainProvider;
  }

  async setCurrentWeb3AuthInstance(web3Auth) {
    this.web3AuthInstance = web3Auth;
  }

  async getCurrentGasPrice() {
    const providerMain = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com/",
      137
    );
    let gasp = await providerMain.getGasPrice();
    console.log(gasp);
    return gasp.mul(5).div(4);
  }
  async loadContractInstance(abi, address) {
    if (!this.web3AuthInstance) {
      throw new Error("Metamask is not connected");
    }
    if (abi == undefined) {
      throw new Error("ABI is not passed as arguments");
    }
    if (address == undefined) {
      throw new Error("address is not passed as argument");
    }
    const ethersProvider = new ethers.providers.Web3Provider(
      this.web3AuthInstance.provider
    );
    const signer = ethersProvider.getSigner();

    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  }

  async getERC20Instance() {
    if (!this.ERC20ContractInstance) {
      this.ERC20ContractInstance = await this.loadContractInstance(
        ERC20RG.abi,
        process.env.NEXT_PUBLIC_ORARE_CONTRACT
      );
    }
    return this.ERC20ContractInstance;
  }
}

const ethersServiceProvider = new EthersServiceProvider();

export default ethersServiceProvider;
