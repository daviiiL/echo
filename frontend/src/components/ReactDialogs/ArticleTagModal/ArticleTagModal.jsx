import { Button, Dialog, DialogTitle } from "@mui/material";
import { Fragment } from "react";
import { useState } from "react";

export default function ArticleTagModal() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Tag Your Article
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tag your article with relevant categories!</DialogTitle>
      </Dialog>
    </Fragment>
  );
}
