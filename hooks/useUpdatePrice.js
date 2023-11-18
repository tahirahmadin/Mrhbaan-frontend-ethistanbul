import { useEffect, useState } from "react";

import { getLatestPrice } from "../actions/serverActions";

export const useUpdatePrice = () => {
  const [priceData, setPriceData] = useState({ price: null, change: null });

  useEffect(() => {
    async function fetchData() {
      const data = await getLatestPrice();
      // console.log("fetched price ", data);
      setPriceData({ price: data?.sleep, change: data?.change });
    }
    fetchData();

    setInterval(() => {
      fetchData();
    }, 5000);
  }, []);

  return priceData;
};
