import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { CircularProgress, FormControl, MenuItem } from "@mui/material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { constants } from "../../utils/constants";
import {
  eatTheDipInstance,
  tokenInstance,
  tradingInstance,
} from "../../contracts";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import ethersServiceProvider from "../../services/ethersServiceProvider";
import web3 from "../../web3";
import { toWei } from "../../utils/helper";
import { ethers } from "ethers";
import { checkUSDTApproved } from "../../actions/smartActions";
import { useSelector } from "react-redux";

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

export default function EatTheDip() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const store = useSelector((state) => state);
  const { menuIndex } = store.ui;

  const [token, setToken] = useState("Ethereum");
  const [amount, setAmount] = useState("10");
  const [priceDrop, setPriceDrop] = useState(5);
  const [noOfOrders, setNoOfOrders] = useState(10);

  const [stakeCase, setStakeCase] = useState(0);
  const [approveCase, setApproveCase] = useState(0);
  const [refetch, setRefetch] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const { accountSC } = useWeb3Auth();

  const wmaticPolygon = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  const usdtPolygon = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let trading_contract = constants.contracts.fiat;
        let res = await checkUSDTApproved(accountSC, trading_contract);

        setIsApproved(parseInt(res) > 0);
      }
      asyncFn();
    }
  }, [accountSC, refetch]);

  useEffect(() => {
    if (amount && noOfOrders) {
      setTotalValue(amount * noOfOrders);
    }
  }, [amount, noOfOrders]);

  async function getCurrentBlockTimestamp() {
    const polygonNodeUrl = "https://polygon-rpc.com";
    // https://polygon-mainnet.g.alchemy.com/v2/38R9Vnxi-6UPne8ACF4k4radrS8-6UJ1
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
    setApproveCase(1);

    let userAddress = accountSC;
    let eatTheDip_contract = constants.contracts.eatTheDip;
    let provider = ethersServiceProvider.web3AuthInstance;

    let finalAmountToApprove = toWei(totalValue.toString(), 18);

    let tokenContract = tokenInstance(provider.web3Auth.provider);
    try {
      let estimateGas = await tokenContract.methods
        .approve(eatTheDip_contract, finalAmountToApprove)
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await tokenContract.methods
        .approve(eatTheDip_contract, finalAmountToApprove)
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
              setApproveCase(2);
            } else {
              setApproveCase(0);
            }
          }
        )
        .on("receipt", async function (receipt) {
          setStakeCase(3);
          setRefetch(refetch + 1);
        })
        .on("error", async function (error) {
          if (error?.code === 4001) {
            setApproveCase(0);
          } else {
            setApproveCase(0);
          }
        });
    } catch (err) {
      console.log(err);
      setApproveCase(0);
    }
  };

  const handleStake = async () => {
    setStakeCase(1);

    let userAddress = accountSC;
    let provider = ethersServiceProvider.web3AuthInstance;

    const amount0 = toWei(amount.toString(), 6);
    const amount1 = toWei("0");
    const token0 = usdtPolygon;
    const token1 = wmaticPolygon;
    const startTimes = await generateTimestampSeries();

    const params = [startTimes, amount0, amount1, token0, token1];

    let data = await provider.getUserInfo();

    let eatTheDipContract = eatTheDipInstance(provider.web3Auth.provider);

    try {
      let estimateGas = await eatTheDipContract.methods
        .startStrategyWithDeposit(...params)
        .estimateGas({ from: userAddress });

      let estimateGasPrice = await web3.eth.getGasPrice();
      const response = await eatTheDipContract.methods
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
              setStakeCase(0);
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
    <Box>
      {stakeCase === 0 && (
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
                variant="body2"
                fontWeight={500}
                fontSize={md ? 14 : 12}
                color={"#ffffff"}
              >
                Buy ${amount} on every 5% drop
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
                fontSize={13}
                fontWeight={600}
                color={"#65CC6E"}
                textAlign={"center"}
              >
                Previous ROI +128%
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
            Start Eat The Dip
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
              </select>{" "}
              on
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
                value={priceDrop}
                onChange={(event) => setPriceDrop(event.target.value)}
                className={classes.select}
              >
                <option value={2}>2%</option>
                <option value={5}>5%</option>
                <option value={10}>10%</option>
              </select>{" "}
              drop for
              <select
                id="mySelect"
                value={noOfOrders}
                onChange={(event) => setNoOfOrders(event.target.value)}
                className={classes.select}
              >
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={10}>10</option>
              </select>{" "}
              orders
            </Typography>

            <Typography
              variant="body2"
              fontSize={12}
              fontWeight={400}
              color={"#414141"}
              textAlign={"center"}
            >
              Beat inflation with Crypto!
            </Typography>
          </Box>

          <Button
            className={classes.buttonConnect}
            mt={2}
            disabled={!accountSC}
            onClick={isApproved ? handleStake : handleApprove}
          >
            {isApproved ? "Buy Now" : "Approve Spending"}{" "}
            {(approveCase > 0 || stakeCase > 0) && (
              <CircularProgress
                size={18}
                style={{
                  color: "white",
                  marginLeft: 5,
                }}
              />
            )}
          </Button>
        </Box>
      )}
      {stakeCase === 3 && (
        <Box>
          <Typography
            variant="body2"
            fontSize={20}
            fontWeight={700}
            color={"#000000"}
            textAlign={"center"}
            my={1}
          >
            Order placed successfully
          </Typography>

          <Box className="text-center">
            {" "}
            <img
              src="https://img.freepik.com/premium-vector/green-check-mark-3d-icon-vector-illustration_567896-126.jpg"
              height="120px"
              width="120px"
              style={{ borderRadius: "50%" }}
            />{" "}
          </Box>
          <Typography
            variant="body2"
            fontSize={12}
            fontWeight={400}
            color={"#414141"}
            textAlign={"center"}
            my={1}
          >
            Accumulation order of <strong>{token}</strong> for every{" "}
            <strong>{frequency}</strong> days for an amount of{" "}
            <strong>{amount}</strong> has been submitted to our strategy pool.
          </Typography>
          <Button className={classes.buttonConnect} mt={2}>
            View Analytics
          </Button>
        </Box>
      )}
    </Box>
  );
}
