// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ethers } from "ethers";
import { GraphQLClient, gql } from "graphql-request";

const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap-istanbul";

async function getCurrentBlockTimestampWithRetry() {
  const polygonNodeUrl = "https://polygon.llamarpc.com"; // Replace with your Polygon node URL
  const provider = new ethers.providers.JsonRpcProvider(polygonNodeUrl);

  async function getTimestamp() {
    try {
      const currentBlockNumber = await provider.getBlockNumber();
      const currentBlock = await provider.getBlock(currentBlockNumber);
      return currentBlock.timestamp;
    } catch (error) {
      throw error; // Propagate the error to trigger retry
    }
  }

  // Retry logic with a delay of 5 seconds
  async function retry() {
    try {
      return await getTimestamp();
    } catch (error) {
      console.error("Error:", error.message);
      console.log("Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 seconds delay
      return retry(); // Retry the function call
    }
  }

  return retry();
}

const client = new GraphQLClient(SUBGRAPH_URL, { headers: {} });

async function queryPendingOrders(blockTimestamp) {
  try {
    const pendingOrders = gql`
        query {
          orders(first: 4, skip: ${0}, where:{open: true , startAt_lte: "${blockTimestamp}" }, orderBy: startAt orderDirection: asc ) {
            id
            amount
            executed
            fromToken
            user
            toToken
            startAt
            price
            orderId
            orderHash
            open
            isBuy
          }
        }`;

    const results = await client.request(pendingOrders);
    return results?.orders;
  } catch (error) {
    console.log("queryPendingOrders error: ", error);
    return [];
  }
}

export default async function handler(req, res) {
  const blockTime = await getCurrentBlockTimestampWithRetry();
  console.log("blocktime ", blockTime);
  const orders = await queryPendingOrders(blockTime);

  const orderIds = orders?.map((ele) => ele?.orderId);

  res.status(200).json({ blockTime, orders });
}
