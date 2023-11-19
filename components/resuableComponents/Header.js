import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  CircularProgress,
  Hidden,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { Wallet } from "@mui/icons-material";
import { Container } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  linkItems: {
    fontWeight: 400,
    fontSize: 14,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  paper: {
    top: 0,
    left: "unset !important",
    right: 0,
    width: 220,
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
    paddingTop: 20,
    overflow: "hidden",
  },
  listItem: {
    justifyContent: "flex-start",
  },
  buttonConnect: {
    backgroundColor: "#0029FF",
    color: "white",
    "&:hover": {
      backgroundColor: "#6385f3",
      color: "white",
    },
  },
}));

const Header = () => {
  const theme = useTheme();
  const store = useSelector((state) => state);
  const { refetchValue } = store.ui;
  const dispatch = useDispatch();
  const router = useRouter();
  const matches = useMediaQuery("(min-width:1153px)");
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [success, setSuccess] = useState(0);
  const classes = useStyles();
  const { active, accountSC, web3AuthSC, connect, wallet } = useWeb3Auth();

  // Get USDT Balance in account
  // useEffect(() => {
  //   if (accountSC) {
  //     async function asyncFn() {
  //       let res = await getUserUSDTBalance(accountSC);
  //       await dispatch(setUsdtBalanceOfUser(res));
  //     }
  //     asyncFn();
  //   }
  // }, [accountSC, refetchValue]);

  // To connect the smart contract wallet
  const loginWallet = async () => {
    await connect();
  };

  return (
    <Box className={classes.background}>
      <Container>
        <header>
          <Box
            style={{
              color: theme.palette.primary.contrastText,
              display: !md && "flex",
              paddingTop: "1rem",
              alignItems: "center",
              justifyContent: !md && "flex-end",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Hidden mdUp>
                <Box>
                  <Typography variant="body2" pb={1} style={{ color: "white" }}>
                    <img
                      src="https://www.sleepswap.io/SleepSwap_Plain.png"
                      height="45px"
                    />
                    <strong>NextJs</strong>TODO APP
                  </Typography>
                </Box>
              </Hidden>

              {!accountSC ? (
                <Box>
                  {web3AuthSC ? (
                    <Button
                      color="primary"
                      style={{
                        fontWeight: 600,
                        minWidth: 120,
                        borderRadius: 14,
                        paddingLeft: 14,
                        paddingRight: 14,
                        textTransform: "capitalize",
                      }}
                      onClick={loginWallet}
                      className={classes.buttonConnect}
                    >
                      Connect {matches ? "Wallet" : ""}{" "}
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      style={{
                        backgroundColor: "#2E2E2E",
                        border: "1px solid #2E2E2E",
                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
                        minWidth: matches ? 150 : 100,
                        borderRadius: 14,
                        color: "white",

                        borderRadius: 7,
                        height: 40,
                        width: "fit-content",
                      }}
                      className={classes.buttonConnect}
                    >
                      Loading
                      <CircularProgress
                        style={{ color: "green", marginLeft: 5 }}
                        size={"16px"}
                      />
                    </Button>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    height: 40,

                    backgroundColor: "white",
                    borderRadius: 4,
                    marginRight: 1,
                    fontWeight: 500,
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      marginLeft: 10,
                      marginRight: 5,
                      marginTop: 15,
                      fontWeight: 600,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    {accountSC &&
                      accountSC.slice(0, 3) + "..." + accountSC.slice(38, 42)}
                  </p>

                  <Button
                    color="secondary"
                    style={{
                      borderTopRightRadius: 14,
                      borderBottomRightRadius: 14,
                    }}
                    className={classes.buttonConnect}
                  >
                    <Wallet />
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </header>
      </Container>
    </Box>
  );
};

export default Header;
