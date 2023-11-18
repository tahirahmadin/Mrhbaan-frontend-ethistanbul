import { useEffect, useMemo, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import ethersServiceProvider from "../services/ethersServiceProvider";

import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setWalletStatus } from "../reducers/UiReducer";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

export const useWeb3Auth = () => {
  const [web3Auth, setWeb3Auth] = useState(null);
  const [address, setAddress] = useState(null);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { walletStatus } = store.ui;

  const clientId =
    "BH_Ai_MmgrONF7sLqWmpRAXNdAuTcIZ6cPENAlVPfPBIn5lUkx9i-l87NQQ4L3fFeM-hfrfEyK9-rZHraowqk9c"; // get from https://dashboard.web3auth.io

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
          rpcTarget:
            "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        };
        const options = {
          clientId: clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget:
              "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["google", "facebook"],
          },
        };
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const modalConfig = {
          [WALLET_ADAPTERS.TORUS_EVM]: {
            label: "torus",
            showOnModal: false,
          },
          [WALLET_ADAPTERS.METAMASK]: {
            label: "metamask",
            showOnDesktop: true,
            showOnMobile: false,
          },
        };

        const openloginAdapter = new OpenloginAdapter({
          // loginSettings: {
          //   mfaLevel: "mandatory",
          // },
          adapterSettings: {
            uxMode: "popup",
            whiteLabel: {
              name: "Safe",
            },
          },
          privateKeyProvider,
        });

        const web3AuthModalPack = new Web3AuthModalPack({
          txServiceUrl: "https://safe-transaction-goerli.safe.global",
        });

        await web3AuthModalPack.init({
          options,
          adapters: [openloginAdapter],
          modalConfig,
        });

        console.log(web3AuthModalPack);

        await ethersServiceProvider.setCurrentWeb3AuthInstance(
          web3AuthModalPack
        );
        setWeb3Auth(web3AuthModalPack);

        console.log("hdjgbcfyhfsjvj");
        console.log(web3AuthModalPack);

        if (web3AuthModalPack.web3Auth) {
          let finalTemp = await web3AuthModalPack.web3Auth.provider;
          console.log("finalTemp");
          console.log(finalTemp);
          const web3 = new Web3(finalTemp);

          const accounts = await web3.eth.getAccounts();
          console.log(accounts);
          if (accounts) {
            await ethersServiceProvider.setCurrentAccount(accounts);
            await dispatch(setWalletStatus(walletStatus + 1));
            setAddress(accounts);
          }
        } else {
          console.log("not here");
        }
        await dispatch(setWalletStatus(walletStatus + 1));
      } catch (error) {
        console.error(error);
        // Router.push("/");
      }
    };

    init();
  }, []);

  const _web3Auth = useMemo(() => {
    let instance = ethersServiceProvider.web3AuthInstance;

    if (!instance) {
      return null;
    }
    return instance.web3Auth;
  }, [walletStatus, ethersServiceProvider.web3AuthInstance]);

  const _account = useMemo(() => {
    let addressData = ethersServiceProvider.currentAccount;

    if (!addressData) {
      return null;
    }

    return addressData;
  }, [walletStatus, ethersServiceProvider.web3AuthInstance]);

  const _active = useMemo(() => {
    let instance = web3Auth;

    if (instance) {
      return instance.status === "connected";
    } else {
      let instanceFromEthers = ethersServiceProvider.web3AuthInstance;
      if (instanceFromEthers) {
        return instanceFromEthers.status === "connected";
      }
      return false;
    }
  }, [walletStatus, ethersServiceProvider.web3AuthInstance]);

  const _wallet = useMemo(() => {
    let instance = web3Auth;

    if (instance) {
      if (instance.status === "connected") {
        return 2;
      } else if (instance.status === "ready") {
        return 1;
      } else {
        return 0;
      }
    } else {
      let instanceFromEthers = ethersServiceProvider.web3AuthInstance;
      if (instanceFromEthers) {
        if (instanceFromEthers.status === "connected") {
          return 2;
        } else if (instanceFromEthers.status === "ready") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    }
  }, [walletStatus]);

  const _disconnect = async () => {
    let instance = ethersServiceProvider.web3AuthInstance;

    if (instance) {
      if (instance.status != "connected") {
        return;
      } else {
        await instance.logout();
        ethersServiceProvider.setCurrentWeb3AuthInstance(instance);
        ethersServiceProvider.setCurrentAccount(null);
        await dispatch(setWalletStatus(walletStatus + 1));
        setAddress(null);
        setWeb3Auth(instance);
        window.location.reload();
      }
    }
  };
  // To connect the smart contract wallet
  const _connect = async () => {
    let web3AuthInstance = ethersServiceProvider.web3AuthInstance;

    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }

    console.log(web3AuthInstance);
    // Connecting the wallet
    await web3AuthInstance.signIn();

    //setting up address into ethersServicesProvider
    const web3 = new Web3(web3AuthInstance.web3Auth.provider);
    const accounts = (await web3.eth.getAccounts())[0];
    if (accounts) {
      await ethersServiceProvider.setCurrentWeb3AuthInstance(web3AuthInstance);
      await ethersServiceProvider.setCurrentAccount(accounts);
      await dispatch(setWalletStatus(walletStatus + 1));
      setAddress(accounts);
      setWeb3Auth(web3AuthInstance);
    }
  };

  return {
    web3AuthSC: _web3Auth,
    accountSC: _account,
    active: _active,
    connect: _connect,
    disconnect: _disconnect,
    wallet: _wallet,
  };
};
