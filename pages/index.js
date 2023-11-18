import React, { useEffect, useState } from "react";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import Seo from "../common/Seo";
import Header from "../components/resuableComponents/Header";
import { useTopPoolInfo } from "../hooks/useTopPoolsInfo";
import TradeCard from "../components/Trade/TradeCard";
import SideBar from "../common/Sidebar";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 24,
    color: "#f9f9f9",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
  card1: {
    backgroundColor: "#171320",
    height: 295,

    backgroundSize: "cover",
    backgroundImage:
      "url(https://ninjapromo.io/wp-content/uploads/2022/11/best-crypto-ad-networks.jpg)",
    width: "100%",

    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: 295,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },

  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 16,
  },
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
}));

const Home = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [pageLoaded, setPageLoaded] = useState(false);

  // To fetch pools info
  const { poolsInfo: topPoolsData, loading } = useTopPoolInfo();

  useEffect(() => setPageLoaded(true), []);

  return (
    <Box style={{ backgroundColor: "#f9f9f9" }}>
      <Seo
        title="SleepSwap - Beat The Inflation"
        description="SleepSwap - Beat The Inflation project is developed in the Eth Istanbul Hackathon"
        keywords="NextJs Starter Kit"
        image="SleepSwap_Thumb.jpg"
      />

      {pageLoaded && (
        <Grid container justifyContent={"center"}>
          <Grid item md={8} sm={12} xs={12}>
            <Header />
            <Box className={classes.background}>
              <Container>
                <Grid
                  container
                  spacing={md ? 4 : 6}
                  mb={md ? 5 : 6}
                  display={"flex"}
                  justifyContent={"space-around"}
                >
                  <Grid item md={3}>
                    <SideBar />
                  </Grid>
                  <Grid item md={6}>
                    <TradeCard />
                  </Grid>
                  <Grid item md={3}></Grid>
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;
