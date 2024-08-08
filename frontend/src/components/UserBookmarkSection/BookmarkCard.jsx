import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function BookmarkCard({ e: article }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <NavLink
      to={`/articles/${article.id}`}
      className="flex w-full justify-between border border-solid rounded-lg p-3 m-2 bg-cardgrey"
    >
      <div>
        <p className="text-customBase font-bold py-1">{article.title}</p>
        <p className="text-sm py-1">{article.sub_title}</p>
      </div>
      <div>
        <IconButton color="success" onClick={handleOpen}>
          <MdOutlineBookmarkAdded size={25} />
        </IconButton>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove from reading list?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained">Continue</Button>
        </DialogActions>
      </Dialog>
    </NavLink>
  );
}
