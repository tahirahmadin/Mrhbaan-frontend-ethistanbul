import { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { GetPoolDataById } from "../queries/graphQueries";
import { STRATEGY_TYPE_ENUM } from "../utils/constants";
import Web3 from "web3";

export function usePoolInfo(strategyId = STRATEGY_TYPE_ENUM.ACCUMULATION) {
  const [poolData, setPoolData] = useState({
    invested: null,
    inOrders: null,
    totalOrders: null,
    vol24: null,
    perVolChange24hr: null,
    allTimeVol: null,
    participants: null,
  });

  // 1. Definition of the GraphQl Query function
  const [getPoolDataQuery, { data, loading, error }] = useLazyQuery(
    GetPoolDataById,
    {
      fetchPolicy: "network-only",
      pollInterval: 1000,
    }
  );

  // 2. Function to call GraphQl query
  useEffect(() => {
    if (!strategyId) {
      return;
    }

    getPoolDataQuery({
      variables: {
        id: strategyId,
      },
    });
  }, [strategyId]);

  // 3. Function to update fetched data
  useEffect(() => {
    // If data not found
    if (!data?.pool) {
      return;
    }
    // if data is available
    let poolDataObj = data?.pool;

    if (poolDataObj) {
      let tempInvested = poolDataObj.deposit.toString();
      let tempInOrders = poolDataObj.fiatBalance.toString();
      let tempTradeVol = poolDataObj.tradeVolume?.toString();

      setPoolData({
        totalOrders: poolDataObj.ordersCount,
        invested: Web3.utils.fromWei(tempInvested, "ether"),
        inOrders: Web3.utils.fromWei(tempInOrders, "ether"),
        allTimeVol: parseInt(Web3.utils.fromWei("0", "ether")),
        participants: poolDataObj.usersCount,
      });
    }
  }, [data]);

  return {
    loading: loading,
    error: error,
    poolInfo: poolData,
  };
}
