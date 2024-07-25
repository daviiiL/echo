import { Button, Dialog, DialogTitle, makeStyles } from "@mui/material";
import { Fragment, useState } from "react";

export default function UserProfileMenu() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        User Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: "absolute",
            left: "3em",
            top: "10.5em",
            boxShadow: "0 0 2px lightgrey",
            borderRadius: "1em",
            border: "1px solid lightgrey",
          },
        }}
        hideBackdrop={true}
      >
        <DialogTitle>User Profile Dialog</DialogTitle>
      </Dialog>
    </Fragment>
  );
}
