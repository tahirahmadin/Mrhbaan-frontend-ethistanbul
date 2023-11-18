import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "black",
    maxWidth: 700,
    height: 360,
    marginTop: 30,
    backgroundImage: "linear-gradient(to bottom,#212121, #000000)",
    width: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      marginTop: 30,
      padding: 20,
      maxWidth: 300,
    },
  },
}));

const LoginComponent = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [pageLoaded, setPageLoaded] = useState(false);

  const { accountSC, web3AuthSC, connect } = useWeb3Auth();
  useEffect(() => setPageLoaded(true), []);

  return (
    <Box>
      {pageLoaded && (
        <Box display={"flex"} justifyContent={"center"}>
          <Box className={classes.card}>
            <Grid container height={"100%"} spacing={2}>
              <Grid
                item
                md={5}
                sm={12}
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <div className="text-center">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-wallet-5339252-4466140.png"
                    alt="success"
                    width={md ? "50%" : "70%"}
                  />
                </div>
              </Grid>
              <Grid
                item
                md={7}
                sm={12}
                xs={12}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={md ? "center" : "flex-start"}
              >
                <Typography
                  mt={1}
                  variant="h2"
                  fontWeight={600}
                  fontSize={21}
                  color={"#f9f9f9"}
                  bgcolor={"trasparent"}
                  textAlign={md ? "center" : "left"}
                >
                  Login first, for gains!
                </Typography>
                <Typography
                  mt={1}
                  variant="body2"
                  fontWeight={400}
                  fontSize={16}
                  color={"#bdbdbd"}
                  textAlign={md ? "center" : "left"}
                >
                  Connect your wallet and start getting into nextGen trading
                  experience
                </Typography>
                <Button
                  onClick={connect}
                  variant="contained"
                  style={{
                    color: "white",
                    borderRadius: 14,
                    marginTop: 20,
                    height: 50,
                    width: "100%",
                    maxWidth: 200,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Connect Wallet
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default LoginComponent;
