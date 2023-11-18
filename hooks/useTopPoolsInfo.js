import { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { GetPoolsDataQuery } from "../queries/graphQueries";

export function useTopPoolInfo() {
  const [poolsData, setPoolsData] = useState(null);

  // 1. Definition of the GraphQl Query function
  const [getTopPoolsDataQuery, { data, loading, error }] = useLazyQuery(
    GetPoolsDataQuery
    // {
    //   fetchPolicy: "network-only",
    //   pollInterval: 1000,
    // }
  );

  // 2. Function to call GraphQl query
  useEffect(() => {
    getTopPoolsDataQuery();
  }, []);

  // 3. Function to update fetched data
  useEffect(() => {
    // If data not found
    if (!data?.pools) {
      return;
    }

    // if data is available
    let poolsDataObj = data?.pools;

    if (poolsDataObj) {
      setPoolsData(poolsDataObj);
    }
  }, [data]);

  return {
    loading: loading,
    error: error,
    poolsInfo: poolsData,
  };
}
