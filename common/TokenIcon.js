import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: 20,
    borderRadius: "50%",
    marginRight: 5,
  },
}));

const TokenIcon = ({ path, styles, className, size }) => {
  const ownClasses = useStyles();

  return (
    <img
      className={[ownClasses.root, className, styles].join(" ")}
      src={path}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "img/no_icon.png";
      }}
      alt={""}
      style={{ height: size }}
    />
  );
};

export default React.memo(TokenIcon);
