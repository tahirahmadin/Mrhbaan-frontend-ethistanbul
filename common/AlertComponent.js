import React from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertComponent = ({ severity, message, onClose, showAlert }) => {
  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
