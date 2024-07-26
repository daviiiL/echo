import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment } from "react";

export default function SaveArticleTagModal({ open, setOpen }) {
  const closeModal = () => setOpen(false);

  return (
    <Fragment>
      <Dialog open={open}>
        <DialogTitle>Almost there!</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
