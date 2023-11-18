import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetUserInvestmentDataByAddress } from "../queries/graphQueries";
import Web3 from "web3";
import ethersServiceProvider from "../services/ethersServiceProvider";

export function useUserInvestmentInfo() {
  let accountSC = ethersServiceProvider.currentAccount;

  const [userData, setUserData] = useState([]);

  const [getUserInvestmentDataQuery, { data, loading, error }] = useLazyQuery(
    GetUserInvestmentDataByAddress
    // {
    //   fetchPolicy: "network-only",
    //   pollInterval: 1000,
    // }
  );

  useEffect(() => {
    if (accountSC) {
      getUserInvestmentDataQuery({
        variables: { user: accountSC },
      });
    }
  }, [accountSC]);

  useEffect(() => {
    if (!data?.userEntities) {
      return;
    }

    setUserData(data.userEntities);
  }, [data]);

  return {
    loading: loading,
    error: error,
    userInvestmentInfo: userData,
  };
}
