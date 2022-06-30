import { SyntheticEvent, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

export default function Notification(props: {
  type: AlertColor;
  open: boolean;
  onClose: Function;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    props.onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        elevation={4}
        onClose={handleClose}
        severity={props.type}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {props.type === "error" ? "Something went wrong" : "Success"}
      </Alert>
    </Snackbar>
  );
}
