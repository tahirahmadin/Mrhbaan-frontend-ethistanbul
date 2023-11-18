import React, { useState } from "react";
import { Box, useTheme, Typography, Paper, useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  CurrencyExchange,
  Dashboard,
  EmojiEvents,
  History,
  Logout,
} from "@mui/icons-material";
import { setMenuIndex } from "../reducers/UiReducer";
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
    color: "black",
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
            color: "black",
          }}
        />
      ),
    },
    {
      title: "Accumulate",
      url: "/pools",
      icon: (
        <EmojiEvents
          style={{
            marginRight: 10,
            color: "black",
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
            color: "black",
          }}
        />
      ),
    },
  ];
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      bgcolor={"#ffffff"}
      display="flex"
      flexDirection="column"
      height="100%"
      maxWidth={200}
      minWidth={150}
    >
      <Box>
        <Box py={2}>
          <Typography variant="body2" pb={1} style={{ color: "black" }}>
            <img
              src="https://pbs.twimg.com/profile_images/1663216871263571968/zdhir_s-_400x400.jpg"
              height="36px"
              style={{ borderRadius: "50%", marginRight: 7 }}
            />
            <strong>Sleep</strong>Swap
          </Typography>
        </Box>
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
                color: "black",
                fontWeight: 600,
              }}
            >
              $23,435
            </Typography>

            <Typography
              variant="small"
              style={{ color: "#414141", lineHeight: 1 }}
            >
              Wallet Balance
            </Typography>
          </Box>
        </Box>

        <Box pt={5}>
          <Box
            onClick={() => dispatch(setMenuIndex(0))}
            key={0}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor: menuIndex === 0 ? "#EEEFF3" : "transparent",
            }}
          >
            <Dashboard
              style={{
                marginRight: 10,
                color: menuIndex === 0 ? "#000000" : "#bdbdbd",
              }}
            />

            <Typography
              variant="title1"
              className={
                menuIndex === 0 ? classes.selectedMenuTitle : classes.menuTitle
              }
            >
              Dashboard
            </Typography>
          </Box>
          <Box
            onClick={() => dispatch(setMenuIndex(1))}
            key={1}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor: menuIndex === 1 ? "#EEEFF3" : "transparent",
            }}
          >
            <CurrencyExchange
              style={{
                marginRight: 10,
                color: menuIndex === 1 ? "#000000" : "#bdbdbd",
              }}
            />

            <Typography
              variant="title1"
              className={
                menuIndex === 1 ? classes.selectedMenuTitle : classes.menuTitle
              }
            >
              Accumulate
            </Typography>
          </Box>
          <Box
            onClick={() => dispatch(setMenuIndex(2))}
            key={1}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor: menuIndex === 2 ? "#EEEFF3" : "transparent",
            }}
          >
            <History
              style={{
                marginRight: 10,
                color: menuIndex === 2 ? "#000000" : "#bdbdbd",
              }}
            />

            <Typography
              variant="title1"
              className={
                menuIndex === 2 ? classes.selectedMenuTitle : classes.menuTitle
              }
            >
              History
            </Typography>
          </Box>

          <Paper
            onClick={disconnect}
            key={0}
            className={classes.selectedPaper}
            sx={{
              boxShadow: 0,
              bgcolor:
                menuIndex === 4 ? constants.highlighColor : "transparent",
            }}
          >
            <Logout
              style={{
                marginRight: 10,
                color: menuIndex === 4 ? "white" : "#bdbdbd",
              }}
            />
            <Typography
              variant="title1"
              className={
                menuIndex === 4 ? classes.selectedMenuTitle : classes.menuTitle
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
