import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  CurrencyBitcoin,
  LensBlur,
  LocationCity,
  MyLocation,
  Twitter,
} from "@mui/icons-material";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import {
  getProfileDataWeb3,
  getSocialProfileDataWeb3,
} from "../../actions/serverActions";

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

  summaryCardOther: {
    // backgroundColor: "#ffffff",
    // url(''), linear-gradient(#e89e66, #E57A26)
    background: "linear-gradient(to bottom, #464646, #464646)",
    backgroundImage: `url(''), linear-gradient(#E5E4E2, #E5E4E2)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    minHeight: 60,
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
  summaryCard: {
    background: "linear-gradient(to bottom, #D72B66, #D72B66)",
    backgroundImage: `url(''), linear-gradient(#808080, #808080)`,
    backgroundSize: "cover",
    marginBottom: 5,
    paddingTop: 30,
    paddingBottom: 20,
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

export default function SocialData() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [socialDataValues, setSocialDataValues] = useState(null);
  const [topUsersData, setTopUsersData] = useState([]);

  const { accountSC } = useWeb3Auth();

  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let web3Data = await getProfileDataWeb3(accountSC);
        if (web3Data && web3Data.identity === null) {
          return;
        }
        setSocialDataValues(web3Data);
        console.log(web3Data);
      }

      asyncFn();
    }
  }, [accountSC]);

  useEffect(() => {
    if (accountSC) {
      async function asyncFn() {
        let web3Data = await getSocialProfileDataWeb3([
          "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
          "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448",
          "ekinci.eth",
        ]);

        console.log(web3Data);
        setTopUsersData(web3Data);
      }

      asyncFn();
    }
  }, [accountSC]);
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
          My social profile
        </Typography>
        {socialDataValues && socialDataValues.length > 1 && (
          <Box className={classes.summaryCard}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={12}
                fontWeight={600}
                color={"#f9f9f9"}
                textAlign={"center"}
              >
                {socialDataValues && (
                  <Box>
                    <img
                      src={socialDataValues[1].avatar}
                      height="100px"
                      width="100px"
                      style={{ borderRadius: "50%" }}
                    />
                  </Box>
                )}
                {socialDataValues[1].displayName}
              </Typography>
              <Typography
                variant="body2"
                fontSize={12}
                fontWeight={400}
                color={"#ffffff"}
                textAlign={"center"}
              >
                {socialDataValues && socialDataValues[1].identity}
              </Typography>
              <Typography
                variant="body2"
                fontSize={12}
                fontWeight={400}
                color={"#ffffff"}
                textAlign={"center"}
              >
                {socialDataValues && socialDataValues[1].description}
              </Typography>
              <Box
                mt={1}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  style={{ color: "white" }}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  mr={2}
                >
                  <LocationCity style={{ color: "white" }} />{" "}
                  <Typography
                    variant="body2"
                    fontSize={12}
                    fontWeight={400}
                    color={"#ffffff"}
                    textAlign={"center"}
                  >
                    {socialDataValues[1].location}
                  </Typography>
                </Box>
                <Box
                  style={{ color: "white" }}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  ml={2}
                >
                  <MyLocation style={{ color: "white" }} />{" "}
                  <Typography
                    variant="body2"
                    fontSize={12}
                    fontWeight={400}
                    color={"#ffffff"}
                    textAlign={"center"}
                  >
                    India
                  </Typography>
                </Box>
              </Box>
            </Box>{" "}
            {socialDataValues &&
              socialDataValues.length > 1 &&
              socialDataValues[1].links && (
                <Box
                  mt={1}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    style={{ color: "white" }}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    {socialDataValues[1].links?.hey && (
                      <a href={socialDataValues[1].links.hey.link}>
                        <IconButton
                          style={{
                            backgroundColor: "#464646",
                            color: "white",
                            height: 32,
                            width: 32,
                          }}
                        >
                          <LensBlur style={{ color: "white" }} />
                        </IconButton>
                      </a>
                    )}
                  </Box>
                  <Box
                    style={{ color: "white" }}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    ml={2}
                  >
                    <Typography
                      variant="body2"
                      fontSize={12}
                      fontWeight={500}
                      color={"#ffffff"}
                      textAlign={"center"}
                    >
                      {socialDataValues[1].links?.twitter && (
                        <a href={socialDataValues[1].links.twitter.link}>
                          <IconButton
                            style={{
                              backgroundColor: "#1E9CEA",
                              color: "white",
                              height: 32,
                              width: 32,
                            }}
                          >
                            <Twitter style={{ color: "white" }} />
                          </IconButton>
                        </a>
                      )}
                    </Typography>
                  </Box>
                  <Box
                    style={{ color: "white" }}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    ml={2}
                  >
                    <Typography
                      variant="body2"
                      fontSize={12}
                      fontWeight={500}
                      color={"#ffffff"}
                      textAlign={"center"}
                    >
                      {socialDataValues[1].address && (
                        <a
                          href={`https://polygonscan.com/address/${socialDataValues[1].address}`}
                        >
                          <IconButton
                            style={{
                              backgroundColor: "#F2A900",
                              color: "white",
                              height: 32,
                              width: 32,
                            }}
                          >
                            <CurrencyBitcoin style={{ color: "white" }} />
                          </IconButton>
                        </a>
                      )}
                    </Typography>
                  </Box>
                </Box>
              )}
          </Box>
        )}

        {!socialDataValues && (
          <Box className={classes.summaryCard}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={12}
                fontWeight={600}
                color={"black"}
                textAlign={"center"}
              >
                <Box>
                  <img
                    src={
                      "https://as1.ftcdn.net/v2/jpg/05/99/32/28/1000_F_599322870_hufBazDahX69a57xhcprgfn4WSjAlXZj.jpg"
                    }
                    height="100px"
                    width="100px"
                    style={{ borderRadius: "50%" }}
                  />
                </Box>
                No Name
              </Typography>

              <Typography
                variant="body2"
                fontSize={12}
                fontWeight={400}
                color={"#ffffff"}
                textAlign={"center"}
              >
                No data found,Please create NextId.
              </Typography>
            </Box>{" "}
          </Box>
        )}
        <Typography
          variant="body2"
          fontSize={14}
          fontWeight={700}
          color={"#000000"}
          textAlign={"center"}
          my={1}
        >
          Top users
        </Typography>
        {topUsersData.length > 0 && (
          <Box>
            {topUsersData.map((singleUserData, index) => {
              return (
                singleUserData &&
                singleUserData[1] && (
                  <Box
                    className={classes.summaryCardOther}
                    style={{
                      backgroundImage:
                        index === 1 &&
                        `url(''), linear-gradient(#E5E4E2, #E5E4E2)`,
                    }}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <Box>
                        <img
                          src={singleUserData[1].avatar}
                          height="30px"
                          width="30px"
                          style={{ borderRadius: "50%" }}
                        />
                      </Box>
                      <Box
                        ml={1}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                      >
                        <Typography
                          fontSize={12}
                          fontWeight={600}
                          color={"#272727"}
                          textAlign={"center"}
                        >
                          {singleUserData[1].displayName}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize={12}
                          fontWeight={400}
                          color={"#272727"}
                          textAlign={"center"}
                        >
                          {singleUserData && singleUserData[1].identity}
                        </Typography>
                      </Box>
                    </Box>{" "}
                  </Box>
                )
              );
            })}
          </Box>
        )}
        {}
      </Box>
    </Box>
  );
}
