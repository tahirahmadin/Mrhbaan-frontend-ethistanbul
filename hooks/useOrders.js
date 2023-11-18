import { useCallback, useEffect, useMemo } from "react";

import { gql, useLazyQuery } from "@apollo/client";

import { getOrdersQuery } from "../queries/graphQueries";
import { STRATEGY_TYPE_ENUM } from "../utils/constants";
import ethersServiceProvider from "../services/ethersServiceProvider";

export function useOrders(strategyType = STRATEGY_TYPE_ENUM.ACCUMULATION) {
  let userAccount = ethersServiceProvider.currentAccount;
  const ordersPage = 1;
  // Graph query for pending orders
  const pendingOrderGraphQuery = useMemo(() => {
    return getOrdersQuery(ordersPage, userAccount, strategyType, "pending");
  }, [userAccount]);

  // Graph query for completed orders
  const completedOrderGraphQuery = useMemo(() => {
    return getOrdersQuery(ordersPage, userAccount, strategyType, "completed");
  }, [userAccount]);

  const [
    getPendingOrders,
    { loading: pendingLoading, error: pendingError, data: pendingOrders },
  ] = useLazyQuery(gql(pendingOrderGraphQuery), {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  const [
    getCompletedOrders,
    { loading: compledLoading, error: completedError, data: completedOrders },
  ] = useLazyQuery(gql(completedOrderGraphQuery), {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  useEffect(() => {
    console.log("completedOrders ", { completedOrders, completedError });
  }, [completedOrders]);

  useEffect(() => {
    getPendingOrders();
    getCompletedOrders();
  }, [userAccount]);

  return {
    loading: pendingLoading || compledLoading,
    error: pendingError || completedError,
    pendingOrders: pendingOrders,
    completedOrders: completedOrders,
  };
}
