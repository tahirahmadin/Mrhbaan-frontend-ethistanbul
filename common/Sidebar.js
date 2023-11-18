import React, { useState } from "react";
import { Box, useTheme, Typography, Paper, useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  BarChart,
  Dashboard,
  EmojiEvents,
  Explore,
  Help,
  Logout,
  Telegram,
  Timeline,
  Wallet,
  YouTube,
} from "@mui/icons-material";
import { setMenuIndex } from "../reducers/UiReducer";
import Link from "next/link";
import { constants } from "../utils/constants";
import { useRouter } from "next/router";
import { useWeb3Auth } from "../hooks/useWeb3Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: constants.baseColorLight,
  },
  inputRoot: {
    backgroundColor: "#6F6F6F",
    height: "100%",
  },
  input: {
    border: "2px solid #bdbdbd",
    outline: "none",

    "&:active": {
      outline: "none",
    },
  },
  menuTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1,
    color: "#bdbdbd",
  },
  selectedMenuTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1,
    color: "#f9f9f9",
  },
  selectedPaper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 7,
  },
}));

const SideBar = ({}) => {
  const router = useRouter();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { menuIndex } = store.ui;

  const { disconnect } = useWeb3Auth();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: (
        <Dashboard
          style={{
            marginRight: 10,
            color: "#bdbdbd",
          }}
        />
      ),
    },
    {
      title: "Strategy pools",
      url: "/pools",
      icon: (
        <EmojiEvents
          style={{
            marginRight: 10,
            color: "#bdbdbd",
          }}
        />
      ),
    },
    {
      title: "Activities",
      url: "/activities",
      icon: (
        <BarChart
          style={{
            marginRight: 10,
            color: "#bdbdbd",
          }}
        />
      ),
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: (
        <Wallet
          style={{
            marginRight: 10,
            color: "#bdbdbd",
          }}
        />
      ),
    },
  ];
  return (
    <Box
      style={{ position: "fixed" }}
      px={2}
      pt={3}
      pb={2}
      bgcolor={"#0C0D10"}
      display="flex"
      flexDirection="column"
      height="100%"
      maxWidth={400}
      minWidth={240}
    >
      <Box>
        <Box py={2}>
          <Typography variant="body2" pb={1} style={{ color: "white" }}>
            <img
              src="https://www.sleepswap.io/SleepSwap_Plain.png"
              height="45px"
            />
            <strong>Sleep</strong>Swap
          </Typography>
        </Box>
        <Link href="/portfolio" style={{ textDecoration: "none" }}>
          <Box display={"flex"} justifyContent={"start"}>
            <Box pr={1}>
              <img
                src="https://cdn.pixabay.com/photo/2023/02/24/00/41/ai-generated-7809880_1280.jpg"
                style={{
                  color: "white",
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                }}
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Typography
                variant="smallheading"
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                $23,435
              </Typography>

              <Typography
                variant="small"
                style={{ color: "#bdbdbd", lineHeight: 1 }}
              >
                Wallet Balance
              </Typography>
            </Box>
          </Box>
        </Link>

        <Box pt={5}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box
              key={10}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  router.pathname === "/"
                    ? constants.highlighColor
                    : "transparent",
              }}
            >
              <Dashboard
                style={{
                  marginRight: 10,
                  color: "#bdbdbd",
                }}
              />

              <Typography
                variant="title1"
                className={
                  router.pathname === "/"
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Dashboard
              </Typography>
            </Box>
          </Link>
          {menuItems.slice(1).map((singleMenu, index) => {
            return (
              <Link href={singleMenu.url} style={{ textDecoration: "none" }}>
                <Box
                  key={index}
                  className={classes.selectedPaper}
                  sx={{
                    boxShadow: 0,
                    bgcolor: router.asPath.includes(singleMenu.url)
                      ? constants.highlighColor
                      : "transparent",
                  }}
                >
                  {singleMenu.icon}

                  <Typography
                    variant="title1"
                    className={
                      router.asPath.includes(singleMenu.url)
                        ? classes.selectedMenuTitle
                        : classes.menuTitle
                    }
                  >
                    {singleMenu.title}
                  </Typography>
                </Box>
              </Link>
            );
          })}

          <a href="https://t.me/sleepswapio" style={{ textDecoration: "none" }}>
            <Paper
              onClick={() => dispatch(setMenuIndex(5))}
              key={5}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 5 ? constants.highlighColor : "transparent",
              }}
            >
              <Telegram
                style={{
                  marginRight: 10,
                  color: "white",
                  color: menuIndex === 5 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 5
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Community
              </Typography>
            </Paper>
          </a>
          <a href="https://t.me/sleepswapio" style={{ textDecoration: "none" }}>
            {" "}
            <Paper
              onClick={() => dispatch(setMenuIndex(6))}
              key={6}
              className={classes.selectedPaper}
              sx={{
                boxShadow: 0,
                bgcolor:
                  menuIndex === 6 ? constants.highlighColor : "transparent",
              }}
            >
              <YouTube
                style={{
                  marginRight: 10,
                  color: menuIndex === 6 ? "white" : "#bdbdbd",
                }}
              />
              <Typography
                variant="title1"
                className={
                  menuIndex === 6
                    ? classes.selectedMenuTitle
                    : classes.menuTitle
                }
              >
                Academy
              </Typography>
            </Paper>
          </a>
          <Paper
            onClick={disconnect}
            key={0}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor:
                menuIndex === 7 ? constants.highlighColor : "transparent",
            }}
          >
            <Logout
              style={{
                marginRight: 10,
                color: menuIndex === 7 ? "white" : "#bdbdbd",
              }}
            />
            <Typography
              variant="title1"
              className={
                menuIndex === 7 ? classes.selectedMenuTitle : classes.menuTitle
              }
            >
              Logout
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
