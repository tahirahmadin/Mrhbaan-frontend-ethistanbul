import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { constants } from "../../utils/constants";
import { Add, Close } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#2E2E2E",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "0.5rem",
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
}));

export default function TodoAdd() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography
              variant="h6"
              mb={1}
              fontWeight={600}
              fontSize={md ? 20 : 16}
              color={"#f9f9f9"}
            >
              Task Name
            </Typography>
          </Box>
          <Button
            style={{
              color: "white",
              backgroundColor: constants.textDark,
              borderRadius: 7,
              height: 40,
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
