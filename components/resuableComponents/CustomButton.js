import React from "react";
import { Button, useMediaQuery, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "10px 0px",
    borderRadius: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0px",
    },
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
}));

const CustomButton = ({
  children,
  style,
  textStyle,
  info,
  onClick,
  disabled,
  staked,
  fullwidth,
}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Button
      variant="contained"
      fullwidth={fullwidth && true}
      classes={{ root: classes.root }}
      style={{
        backgroundColor: info || disabled || staked ? "#b2b3b3" : "#000000",
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={
          info
            ? "https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/DisabledSpoonIcon.svg"
            : "https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/SpoonIcon.svg"
        }
        alt="spoon"
        width={30}
        height={25}
      />
      <Typography
        variant="body2"
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          color: info || disabled || staked ? "#fff" : "#fff",
          ...textStyle,
        }}
        className={classes.buttonText}
      >
        {children}
      </Typography>

      <img
        src={
          info
            ? "https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/DisabledForkIcon.svg"
            : "https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/ForkIcon.svg"
        }
        alt="fork"
        width={30}
      />
    </Button>
  );
};

export default CustomButton;
