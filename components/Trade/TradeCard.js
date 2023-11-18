import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { FormControl, MenuItem } from "@mui/material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { constants } from "../../utils/constants";
import { Close } from "@mui/icons-material";
import { tokenInstance, tradingInstance } from "../../contracts";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import web3 from "../../web3";
import { toWei } from "../../utils/helper";
import { ethers } from "ethers";
import {
  checkUSDTApproved,
  getUserUSDTBalance,
} from "../../actions/smartActions";
import { setUsdtBalanceOfUser } from "../../reducers/UiReducer";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    border: "10px solid #f9f9f9",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
  summaryCard: {
    // backgroundColor: "#ffffff",
    background: "linear-gradient(to bottom, #6385f3, #5a7ff2)",
    backgroundImage: `url("eth-background.jpg"), linear-gradient(#eb01a5, #d13531)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 170,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
  inputCard: {
    // backgroundColor: "#ffffff",
    backgroundColor: "#EEEFF3",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "1rem",

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
  buttonConnect: {
    marginTop: 10,
    backgroundColor: "#0029FF",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.5625rem",
    width: "100%",
    height: 44,
    "&:hover": {
      backgroundColor: "#6385f3",
      color: "white",
    },
  },
  select: {
    color: "black",
    fontSize: 14,
    fontWeight: 600,
    border: "none", // Remove the border
    borderRadius: 10, // Remove border-radius
    marginLeft: 10,
    marginRight: 10,
    padding: 4,
    paddingLeft: 10,
    background: "#DFE3E7", // Make the background transparent
  },
}));

export default function TradeCard() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [amount, setAmount] = useState("10");
  const [token, setToken] = useState("Ethereum");
  const [frequency, setFrequency] = useState(1);
  const [time, setTime] = useState(1);
  const [stakeCase, setStakeCase] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const { accountSC } = useWeb3Auth();

  const wmaticPolygon = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  const usdtPolygon = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let provider = ethersServiceProvider.web3AuthInstance;
        let trading_contract = constants.contracts.fiat;
        let res = await checkUSDTApproved(accountSC, trading_contract);
        console.log("res");
        console.log(res);
        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC]);

  useEffect(() => {
    if (amount && time && frequency) {
      setTotalValue(amount * time * frequency);
    }
  }, [amount, time, frequency]);

  const widget = async () => {
    const response = await fetch(
      "https://api-sandbox.gatefi.com/onramp/v1/buy?amount=10&crypto=BTC&fiat=USD&partnerAccountId=40ccf701-af56-4662-8681-5b9a9ca3fb22&payment=debit-credit-card&redirectUrl=google.com&region=US&walletAddress=mjEcj2LA3vj1nDi8ZD3QMCs9kNqVk7Dpee",
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "access-control-allow-headers": "Accept",
          "api-key": "eOLFHIEVQmwqJOAwWBOiFsfnNhncHigb",
        },
      }
    );
    const data = await response;
    return data.url;
  };

  async function getCurrentBlockTimestamp() {
    const polygonNodeUrl = "https://polygon-rpc.com";
    const provider = new ethers.providers.JsonRpcProvider(polygonNodeUrl);

    // Get the current block number
    const currentBlockNumber = await provider.getBlockNumber();

    // Get the current block
    const currentBlock = await provider.getBlock(currentBlockNumber);
    console.log("current block ", currentBlock);
    // Get the timestamp of the current block
    const currentBlockTimestamp = currentBlock.timestamp;

    return currentBlockTimestamp;
  }

  async function generateTimestampSeries() {
    const timestamps = [];
    const currentTimestamp = await getCurrentBlockTimestamp(); // Math.floor(new Date().getTime() / 1000);

    // Generate 5 timestamps with an increasing 10-minute interval
    for (let i = 0; i < 5; i++) {
      const timestamp = currentTimestamp + i * 86400; // 86400 seconds = 1 day
      timestamps.push(timestamp);
    }

    return timestamps;
  }

  const handleApprove = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let trading_contract = constants.contracts.trading;
    let provider = ethersServiceProvider.web3AuthInstance;
    console.log(provider);

    let data = await provider.getUserInfo();
    console.log(data);
    let tokenContract = tokenInstance(provider.web3Auth.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(trading_contract, "10000000000000000000000000000")
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(trading_contract, "10000000000000000000000000000")
        .send(
          {
            from: userAddress,
            maxPriorityFeePerGas: "50000000000",
            gasPrice: parseInt(
              (parseInt(estimateGasPrice) * 10) / 9
            ).toString(),
            gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
          },
          async function (error, transactionHash) {
            if (transactionHash) {
              setStakeCase(2);
            } else {
              setStakeCase(4);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setStakeCase(3);
          // setResetFlag(resetFlag + 1);
        })
        .on("error", async function (error) {
          if (error?.code === 4001) {
            setStakeCase(4);
          } else {
            setStakeCase(4);
          }
        });
    } catch (err) {
      console.log(err);
      setStakeCase(4);
    }
  };

  const handleStake = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let trading_contract = constants.contracts.trading;
    let provider = ethersServiceProvider.web3AuthInstance;
    console.log(provider);
    const amount0 = toWei(amount.toString(), 6);
    const amount1 = toWei("0");
    const token0 = usdtPolygon;
    const token1 = wmaticPolygon;
    const startTimes = await generateTimestampSeries();

    console.log("amounts ", { amount0, amount1 });

    const params = [startTimes, amount0, amount1, token0, token1];

    console.log("params ", params);

    let data = await provider.getUserInfo();
    console.log(data);
    let tradingContract = tradingInstance(provider.web3Auth.provider);
    console.log(tradingContract);
    try {
      let estimateGas = await tradingContract.methods
        .startStrategyWithDeposit(...params)
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tradingContract.methods
        .startStrategyWithDeposit(...params)
        .send(
          {
            from: userAddress,
            maxPriorityFeePerGas: "50000000000",
            gasPrice: parseInt(
              (parseInt(estimateGasPrice) * 10) / 9
            ).toString(),
            gas: parseInt((parseInt(estimateGas) * 10) / 9).toString(),
          },
          async function (error, transactionHash) {
            if (transactionHash) {
              setStakeCase(2);
            } else {
              setStakeCase(4);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setStakeCase(3);
          setResetFlag(resetFlag + 1);
        })
        .on("error", async function (error) {
          if (error?.code === 4001) {
            setStakeCase(4);
          } else {
            setStakeCase(4);
          }
        });
    } catch (err) {
      console.log(err);
      setStakeCase(4);
    }
  };

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Typography
          variant="body2"
          fontSize={20}
          fontWeight={700}
          color={"#000000"}
          textAlign={"center"}
          my={1}
        >
          Invest
        </Typography>
        <Box className={classes.summaryCard}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={12}
              fontWeight={600}
              color={"#f9f9f9"}
              textAlign={"center"}
            >
              <img
                src="https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png"
                height="24px"
                width="24px"
                style={{ borderRadius: "50%" }}
              />{" "}
              Ethereum
            </Typography>
            <Typography
              style={{ textTransform: "capitalize" }}
              variant="body2"
              fontWeight={500}
              fontSize={md ? 14 : 12}
              color={"#ffffff"}
            >
              Buy ${amount}/month
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontSize={12}
              fontWeight={400}
              color={"#f9f9f9"}
              textAlign={"center"}
            >
              Total investment
            </Typography>
            <Typography
              variant="h1"
              fontSize={22}
              fontWeight={600}
              color={"#f9f9f9"}
              textAlign={"center"}
            >
              ${totalValue}
            </Typography>
            <Typography
              variant="body2"
              fontSize={15}
              fontWeight={600}
              color={"#65CC6E"}
              textAlign={"center"}
            >
              ROI +68%
            </Typography>
          </Box>

          <Typography
            variant="body2"
            fontSize={12}
            fontWeight={400}
            color={"#ffffff"}
            textAlign={"center"}
          >
            If you bought over past 12 months
          </Typography>
        </Box>
        <Typography
          variant="body2"
          fontSize={20}
          fontWeight={700}
          color={"#000000"}
          textAlign={"center"}
          mt={2}
        >
          Start Dollar Cost Averaging
        </Typography>
        <Box className={classes.inputCard} mt={2}>
          <Typography
            fontSize={12}
            fontWeight={600}
            color={"#000000"}
            textAlign={"center"}
          >
            Buy{" "}
            <select
              id="mySelect"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className={classes.select}
            >
              <option value="10">$10</option>
              <option value="25">$25</option>
              <option value="50">$50</option>
            </select>{" "}
            of
            <select
              id="mySelect"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className={classes.select}
            >
              <option value="Ethereum">Ethereum</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="DAI">DAI</option>
            </select>
          </Typography>
          <Typography
            fontSize={12}
            fontWeight={600}
            color={"#000000"}
            textAlign={"center"}
          >
            every
            <select
              id="mySelect"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              className={classes.select}
            >
              <option value="1">day</option>
              <option value="7">week</option>
              <option value="30">month</option>
            </select>{" "}
            for
            <select
              id="mySelect"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className={classes.select}
            >
              <option value="1">week</option>
              <option value="7">month</option>
              <option value="30">year</option>
            </select>
          </Typography>

          <Typography
            variant="body2"
            fontSize={12}
            fontWeight={400}
            color={"#414141"}
            textAlign={"center"}
          >
            Beat the inflation with Crypto!
          </Typography>
        </Box>

        <Button
          className={classes.buttonConnect}
          mt={2}
          disabled={!accountSC}
          onClick={isApproved ? handleStake : handleApprove}
        >
          {isApproved ? "Buy Now" : "Approve Spending"}
        </Button>
      </Box>
    </Box>
  );
}
