import { tokenInstance, tradingInstance } from "../contracts";
import { fromWei } from "../utils/helper";
import web3 from "../web3";

// ***************** ERC20 Token Contract *************** //
//READ BalanceOf Orare
//RETURNS number

export const getUserUSDTBalance = async (userAddress) => {
  let result = await tokenInstance()
    .methods.balanceOf(userAddress)
    .call((err, response) => {
      return response;
    });

  let finalAmount = fromWei(result.toString(), 6);
  console.log(result);
  return parseFloat(finalAmount).toFixed(2);
};

//READ approved
//RETURNS number
export const checkUSDTApproved = async (userAddress, contractAddress) => {
  let tokenContract = await tokenInstance();
  let result = tokenContract.methods
    .allowance(userAddress, contractAddress)
    .call((err, response) => {
      return response;
    });
  console.log(result);
  return result;
};
// ***************** Trading Contract *************** //

//READ getPoolDetails
//RETURNS object
export const getPoolDetails = async (address) => {
  // let result = await tradingInstance()
  //   .methods.balances(address)
  //   .call((err, res) => {
  //     return res;
  //   });

  // return result;
  return 10;
};
