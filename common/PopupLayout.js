import React from "react";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowPopup } from "../reducers/UiReducer";

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
    height: 420,
    minHeight: 350,
    maxWidth: 788,
    position: "relative",
    background: "#fff",
    border: "15px solid #D1FE1D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 11,
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: 450,
      padding: "25px 5% 20px 5%",
    },
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 22,
    width: 22,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
    },
  },
}));

const PopupLayout = ({ children }) => {
  const classes = useStyles();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const { showPopup } = store.ui;

  const handleClose = () => {
    dispatch(toggleShowPopup(false));
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={showPopup}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-end" onClick={handleClose}>
              <img
                src="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/icons/closeIcon.svg"
                alt="Onerare"
                className={classes.closeIcon}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PopupLayout;
