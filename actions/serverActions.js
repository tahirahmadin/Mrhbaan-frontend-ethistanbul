import axios from "axios";
import { constants } from "../utils/constants";

// Update user profile data
let baseUrl = constants.backend_dev;
let foodTruckBaseUrl = "https://foodtruck.onerare.io";

export const getUserData = async (address) => {
  let url = `${baseUrl}/user/${address}`;
  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const getProfileDataWeb3 = async (userAddress) => {
  let url = `https://api.web3.bio/profile/${userAddress}`;
  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const getSocialProfileDataWeb3 = async (addresses) => {
  let finalData = await addresses.map(async (singleAddress) => {
    let res = await getProfileDataWeb3(singleAddress);

    return res;
  });
  let resultObject = await Promise.all(finalData).then((output) => {
    return output;
  });
  console.log(resultObject);
  return resultObject;
};

export const getLatestPrice = async () => {
  let url = `${baseUrl}/order-apis/v1/latest-price`;
  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const updateUserData = async (userData) => {
  let url = `${baseUrl}/user`;
  let response = axios
    .post(url, userData)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};

// Price of Orare
export const getTokenPriceStats = async (name) => {
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${name.toLowerCase()}&vs_currencies=usd`;
  let response = await axios.get(url);

  return response.data;
};
