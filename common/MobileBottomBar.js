import React, { useState } from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDashboardMenuItem } from "../reducers/UiReducer";
import { makeStyles } from "@mui/styles";
import {
  DashboardSharp,
  ShoppingBagSharp,
  HistorySharp,
  LogoutSharp,
  LocalOfferSharp,
  LocalPizzaSharp,
  Analytics,
  Wallet,
  Pool,
  Money,
  Home,
  StackedBarChart,
  Cookie,
  BarChart,
  EmojiEvents,
  Dashboard,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { constants } from "../utils/constants";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    zIndex: 101,
    boxShadow: "1px 5px 50px -17px #000000",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "#212121",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "2px",
    borderRight: "1px solid #414141",
    "&:last-child": {
      border: "none",
    },
  },
  tab_name: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: 600,
    color: "#f9f9f9",
  },
}));

const MobileBottomBar = () => {
  const router = useRouter();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { dashboardMenuItems, selectedDashboardMenuItem } = store.ui;
  const theme = useTheme();

  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: (
        <Dashboard
          style={{
            color: "#bdbdbd",
          }}
        />
      ),
    },
    {
      title: "Pools",
      url: "/pools",
      icon: (
        <EmojiEvents
          style={{
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
            color: "#bdbdbd",
          }}
        />
      ),
    },
  ];
  return (
    <Grid container className={classes.tabs}>
      <Grid
        key={10}
        item
        sm={3}
        xs={3}
        className={classes.tab}
        bgcolor={router.pathname === "/" && constants.highlighColor}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Box display={"flex"} flexDirection="column" alignItems={"center"}>
            <Dashboard
              style={{
                marginRight: 10,
                color: "#bdbdbd",
              }}
            />
            <Typography variant="body2" className={classes.tab_name}>
              Dashboard
            </Typography>
          </Box>
        </Link>
      </Grid>
      {menuItems.slice(1).map((singleMenu, index) => {
        return (
          <Grid
            key={index}
            item
            sm={3}
            xs={3}
            className={classes.tab}
            bgcolor={
              router.asPath.includes(singleMenu.url) && constants.highlighColor
            }
          >
            <Link href={singleMenu.url} style={{ textDecoration: "none" }}>
              <Box
                display={"flex"}
                flexDirection="column"
                alignItems={"center"}
              >
                {singleMenu.icon}
                <Typography variant="body2" className={classes.tab_name}>
                  {singleMenu.title}
                </Typography>
              </Box>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MobileBottomBar;
