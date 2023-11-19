import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetPoolUserDataByAddress } from "../queries/graphQueries";
import Web3 from "web3";
import ethersServiceProvider from "../services/ethersServiceProvider";

export function useUserPoolInfo() {
  let accountSC = ethersServiceProvider.currentAccount;

  const [userData, setUserData] = useState(null);

  const [getPoolUserDataQuery, { data, loading, error }] = useLazyQuery(
    GetPoolUserDataByAddress,
    {
      fetchPolicy: "network-only",
      pollInterval: 10000,
    }
  );

  useEffect(() => {
    console.log("calling");
    if (accountSC) {
      getPoolUserDataQuery({
        variables: { user: accountSC },
        // variables: { user: "0x8bd0e959e9a7273d465ac74d427ecc8aaaca55d8" },
      });
    }
  }, [accountSC]);

  useEffect(() => {
    console.log("data");
    console.log(data);

    if (!data?.poolUsers) {
      return;
    }
    console.log("data.poolUsers");
    console.log(data.poolUsers);
    setUserData(data.poolUsers);
  }, [data]);

  return {
    loading: loading,
    error: error,
    userPoolInfo: userData,
  };
}
