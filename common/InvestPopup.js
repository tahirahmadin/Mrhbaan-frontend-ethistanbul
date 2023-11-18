//done
import React, { useState } from "react";
import {
  Typography,
  Slide,
  Dialog,
  Backdrop,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { STRATEGY_TYPE_ENUM, constants } from "../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    minHeight: 400,
    maxWidth: 480,
    padding: 21,
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 21,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },

  confirmButton: {
    borderRadius: 14,
    background: constants.highlighColorDark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 40px 10px 40px",
    color: "white",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: "fit-content",
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
  cancelButton: {
    color: "black",
    padding: "10px 20px 10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: "fit-content",
    fontWeight: 600,
    borderRadius: 14,
    fontSize: 16,
    "&:hover": {
      color: "rgba(130, 71, 229, 0.9)",
    },
  },
  statsCard: {
    width: 130,
    border: "1px solid #919191",
    borderRadius: 14,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const InvestPopup = ({
  poolTypeProp,
  open,
  txCase,
  isApproved,
  orderObj,
  resetPopup,
  handleApprove,
  handleStake,
}) => {
  const classes = useStyles();

  const handleResetPopup = () => {
    resetPopup();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={null}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <IconButton
            style={{ position: "absolute", right: 10, top: 10 }}
            onClick={handleResetPopup}
          >
            <Close style={{ cursor: "pointer", color: "black" }} />
          </IconButton>

          {txCase != 4 && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                color={"#000000"}
                mb={2}
              >
                {isApproved ? "Place an order" : "Approve strategy"}
              </Typography>

              <img
                src="https://cdn-icons-png.flaticon.com/512/4177/4177444.png"
                height="100px"
              />

              <Typography
                mt={3}
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#212121"}
              >
                Order summary
              </Typography>
              {orderObj && (
                <Box>
                  <Box
                    mt={2}
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Box className={classes.statsCard}>
                      <Typography
                        variant="body3"
                        fontWeight={300}
                        fontSize={11}
                        color={"black"}
                      >
                        Deposit($)
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        fontSize={14}
                        color={"black"}
                        pt={0.2}
                      >
                        {orderObj.amount} USDT
                      </Typography>
                    </Box>
                    <Box className={classes.statsCard}>
                      <Typography
                        variant="body3"
                        fontWeight={300}
                        fontSize={11}
                        color={"black"}
                      >
                        Token
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        fontSize={14}
                        color={"black"}
                        pt={0.2}
                      >
                        {orderObj.selectedToken.name}
                      </Typography>
                    </Box>
                  </Box>
                  {poolTypeProp === STRATEGY_TYPE_ENUM.ACCUMULATION && (
                    <Box
                      mt={1}
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                    >
                      <Box className={classes.statsCard}>
                        <Typography
                          variant="body3"
                          fontWeight={300}
                          fontSize={11}
                          color={"black"}
                        >
                          No of orders
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          fontSize={14}
                          color={"black"}
                          pt={0.2}
                        >
                          {orderObj.grids}
                        </Typography>
                      </Box>
                      <Box className={classes.statsCard}>
                        <Typography
                          variant="body3"
                          fontWeight={300}
                          fontSize={11}
                          color={"black"}
                        >
                          Buy on every
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          fontSize={14}
                          color={"black"}
                          pt={0.2}
                        >
                          {orderObj.percent}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {poolTypeProp === STRATEGY_TYPE_ENUM.DCA && (
                    <Box
                      mt={1}
                      display="flex"
                      flexDirection={"row"}
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                    >
                      <Box className={classes.statsCard}>
                        <Typography
                          variant="body3"
                          fontWeight={300}
                          fontSize={11}
                          color={"black"}
                        >
                          Amount per trade($)
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          fontSize={14}
                          color={"black"}
                          pt={0.2}
                        >
                          ${orderObj.amountPerTradeState}
                        </Typography>
                      </Box>
                      <Box className={classes.statsCard}>
                        <Typography
                          variant="body3"
                          fontWeight={300}
                          fontSize={11}
                          color={"black"}
                        >
                          Buy on every (hr)
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          fontSize={14}
                          color={"black"}
                          pt={0.2}
                        >
                          {orderObj.frequency} Hrs
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              <div className="h-100 w-100 d-flex flex-column justify-content-between">
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={400}
                  fontSize={14}
                  pt={2}
                  px={1}
                  color={"#000000"}
                >
                  {isApproved
                    ? "Confirm to start gaining automated profits"
                    : "Confirm to approve the strategy"}
                </Typography>

                <div className="w-100 d-flex justify-content-center mb-4 mt-3">
                  <div className="px-2">
                    <Button
                      className={classes.cancelButton}
                      onClick={handleResetPopup}
                    >
                      Go back
                    </Button>
                  </div>
                  <div className="px-2">
                    <Button
                      className={classes.confirmButton}
                      onClick={isApproved ? handleStake : handleApprove}
                    >
                      {txCase === 0 && "Confirm"}
                      {txCase === 1 && "Waiting for confirmation..."}
                      {txCase === 2 && (
                        <span>
                          <CircularProgress
                            size={18}
                            style={{
                              color: "white",
                              marginRight: 5,
                            }}
                          />{" "}
                          Processing...
                        </span>
                      )}

                      {txCase === 3 && "Failed!, Try again"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {txCase === 4 && (
            <>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                color={"#000000"}
                mb={2}
              >
                Order placed
              </Typography>

              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/successfully-approve-5331611-4659611.png"
                height="120px"
              />

              <Typography
                mt={3}
                variant="h6"
                textAlign="left"
                fontWeight={600}
                color={"#212121"}
              >
                You have invested
              </Typography>
              <Box
                mt={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    Deposit($)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {orderObj.amount} USDT
                  </Typography>
                </Box>
                <Box className={classes.statsCard}>
                  <Typography
                    variant="body3"
                    fontWeight={300}
                    fontSize={11}
                    color={"black"}
                  >
                    Token
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    color={"black"}
                    pt={0.2}
                  >
                    {orderObj.selectedToken.name}
                  </Typography>
                </Box>
              </Box>
              <div className="h-100 w-100 d-flex flex-column justify-content-between">
                <Typography
                  variant="body2"
                  textAlign="center"
                  fontWeight={500}
                  fontSize={14}
                  pt={3}
                  color={"#000000"}
                >
                  Go to dashboard and see your strategy in action
                </Typography>
                <div className="w-100 d-flex justify-content-center mb-4 mt-3">
                  <div className="px-2">
                    <Button
                      className={classes.confirmButton}
                      onClick={handleResetPopup}
                    >
                      Continue to app
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default InvestPopup;
