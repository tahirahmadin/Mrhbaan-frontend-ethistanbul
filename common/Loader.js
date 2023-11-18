import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
}));

export default function Loader({ width }) {
  const classes = useStyles();

  return (
    <div className="d-flex justify-content-center">
      <object
        type="image/svg+xml"
        data="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/LoaderImage.svg"
        style={{ width: width }}
        className={classes.root}
      ></object>
    </div>
  );
}
