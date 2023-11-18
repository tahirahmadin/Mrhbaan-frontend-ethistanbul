import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  useMediaQuery,
  Hidden,
  useTheme,
} from "@mui/material";
// import Lottie from "react-lottie";
import Link from "next/link";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: "",
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Error404Page = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box px="7vw" py="15vh" minHeight="80vh" alignItems="center" display="flex">
      <Grid container>
        <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
          <Typography variant="h1" style={{ marginBottom: theme.spacing(5) }}>
            Oops ! Something went wrong .
          </Typography>

          <Typography
            variant="body1"
            style={{ marginBottom: theme.spacing(5) }}
          >
            THE PAGE YOU ARE LOOKING FOR DOESN’T SEEM TO EXIST.
          </Typography>
          <Link href="/">
            <Button
              style={{
                borderRadius: 12,
                paddingLeft: theme.spacing(5),
                paddingRight: theme.spacing(5),
                border: "1px solid black",
              }}
              fullWidth={xs && true}
              variant="outlined"
              color="secondary"
            >
              back to home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Error404Page;
