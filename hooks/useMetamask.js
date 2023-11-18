import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

import { SUPPORTED_CHAINS } from "../config";
import ethersServiceProvider from "../services/ethersServiceProvider";
import { setNetworkModalOpen } from "../reducers/UiReducer";
import { useDispatch, useSelector } from "react-redux";

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS });

export const useMetamask = () => {
  const { active, activate, account, chainId, error, deactivate } =
    useWeb3React();
  const [tried, setTried] = useState(false);
  const dispatch = useDispatch();
  const [activeChainId, setActiveChainId] = useState();
  const store = useSelector((state) => state);
  const { networkErrorModalOpen } = store.ui;

  useEffect(() => {
    let result = localStorage.getItem("connected");
    if (result === "none") {
      // console.log("connect wallet first");
    } else {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          }
          setTried(true);
        }
      });
    }
  }, [activate]);

  useEffect(() => {
    if (active) {
      setActiveChainId(chainId);
      setTried(true);
    } else if (error && error instanceof UnsupportedChainIdError) {
      setActiveChainId(chainId);
    }
  }, [active]);

  useEffect(() => {
    if (!chainId && tried && active) {
      injected.getChainId().then((res) => setActiveChainId(res.toString()));
    }
  }, [chainId]);

  useEffect(() => {
    if (tried) {
      if (SUPPORTED_CHAINS.includes(activeChainId) && networkErrorModalOpen) {
        dispatch(setNetworkModalOpen());
      } else if (
        !SUPPORTED_CHAINS.includes(activeChainId) &&
        !networkErrorModalOpen
      ) {
        dispatch(setNetworkModalOpen());
      }
    }
  }, [activeChainId]);

  // useEffect(() => {
  //   ethersServiceProvider.setCurrentAccount(account);
  // }, [account]);

  const connectMetamask = async () => {
    try {
      {
        // console.log(active);
        // console.log(account);
        // console.log(chainId);
        // console.log(error);
      }
      await activate(injected, undefined, true);
      // history.replace("/dashboard");
      // console.log("Metamask loaded");
      localStorage.setItem("connected", "active");
    } catch (err) {
      if (err instanceof UnsupportedChainIdError) {
        await activate(injected);
        injected.getChainId().then((res) => setActiveChainId(res.toString()));
      } else {
        console.log(err, "Error in connecting metamask");
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
      localStorage.setItem("connected", "none");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    active,
    account,
    tried,
    chainId,
    disconnectWallet,
    connectMetamask,
  };
};
