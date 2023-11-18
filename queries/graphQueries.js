import { gql } from "@apollo/client";

export const GetPoolDataById = gql`
  query GetPoolDataById($id: String) {
    pool(id: $id) {
      id
      strategyType
      usersCount
      ordersCount
      deposit
      fiatBalance
      tokenBalance
    }
  }
`;
export const GetPoolsDataQuery = gql`
  query GetPoolsDataQuery($id: String) {
    pools(id: $id, orderBy: deposit, orderDirection: desc) {
      id
      strategyType
      usersCount
      ordersCount
      deposit
      fiatBalance
      tokenBalance
    }
  }
`;

export const GetPoolUserDataByAddress = gql`
  query GetPoolUserDataByAddress($user: String, $type: String) {
    poolUsers(where: { user: $user, strategyType: $type }) {
      tokenBalance
      strategyType
      ordersCount
      id
      fiatBalance
      deposit
      user
    }
  }
`;

export const GetUserInvestmentDataByAddress = gql`
  query GetUserInvestmentDataByAddress($user: String) {
    userEntities(where: { user: $user }) {
      id
      deposit
      fiatBalance
      tokenAddress
      tokenBalance
      strategyType
      user
    }
  }
`;

export const GetPoolUserActivityQuery = gql`
  query getPoolUserActivityQuery($user: String, $type: String) {
    userActivities(where: { user: $user, strategyType: $type }) {
      user
      token
      timestamp
      price
      orderId
      id
      fiat
      amount
      action
      strategyType
      tokenAddress
    }
  }
`;

export const GetUserAllActivities = gql`
  query GetUserAllActivities($user: String) {
    userActivities(where: { user: $user }) {
      user
      token
      timestamp
      price
      orderId
      id
      fiat
      amount
      action
      strategyType
      tokenAddress
    }
  }
`;

export const GetUserGraphData = gql`
  query GetUserGraphData($address: String) {
    userEntities(first: 5, where: { address: $address }) {
      id
      address
      dishCount
      ingredientCount
      dishCountRewards
      score
      scoreSeason
      stakedFlag
      marketFlag
      kitchenFlag
    }
  }
`;
export const GetActiveOrdersOfUser = gql`
  query GetActiveOrdersOfUser($address: String, $type: String) {
    orders(
      first: 500
      orderBy: orderId
      orderDirection: desc
      where: {
        user: $address
        strategyType: $type
        open: $open
        completed: $completed
      }
    ) {
      id
      orderId
      user
      open
      completed
      entryPrice
      nextPrice
      percentage
      grids
      executedGrids
      fiatBalance
      deposit
      remainingFiat
      tokenBalance
      tokenAddress
      strategyType
      remainingToken
      timestamp
    }
  }
`;

export const getOrdersQuery = (
  page = 1,
  account,
  strategy,
  state = "pending"
) => {
  const items = page * 10;
  const skips = (page - 1) * 10;

  let open = true;
  let completed = true;

  if (state === "pending") {
    open = true;
    completed = false;
  } else if (state === "completed") {
    open = false;
    completed = true;
  } else {
    // cancelled
    open = false;
    completed = false;
  }

  const queryObj = `
    query {
      orders(
        first: ${items},
        skip: ${skips},
        orderBy: timestamp,
        orderDirection: desc,
        where: { user: "${account}", open: ${open}, completed: ${completed}, strategyType: "${strategy}"  }
      ) {
        id
        orderId
        user
        open
        completed
        entryPrice
        nextPrice
        percentage
        grids
        executedGrids
        fiatBalance
        deposit
        remainingFiat
        tokenBalance
        tokenAddress
        strategyType
        remainingToken
        dcaFrequencyInHours
        dcaAmountPerTrade
        timestamp
      }
    }
  `;

  return queryObj;
};
