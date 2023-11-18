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
    border: "1px solid #bdbdbd",
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
  const [frequency, setFrequency] = useState("1");
  const [time, setTime] = useState("1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
              Buy $10/month
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography
              variant="h3"
              fontSize={18}
              fontWeight={600}
              color={"#f9f9f9"}
              textAlign={"center"}
            >
              $1000
            </Typography>
            <Typography
              variant="body2"
              fontSize={18}
              fontWeight={600}
              color={"#65CC6E"}
              textAlign={"center"}
            >
              +12
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
        <Button className={classes.buttonConnect} mt={2}>
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}
