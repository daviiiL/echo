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
import store from "../../store";
import { unsubscribeFromArticle } from "../../store/article";

export default function BookmarkCard({ e: article }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    await store.dispatch(unsubscribeFromArticle(article.id));
    setOpen(false);
  };

  return (
    <div className="flex w-full justify-between border border-solid rounded-lg p-3 m-2 bg-cardgrey">
      <NavLink className="flex-col w-full mr-5" to={`/articles/${article.id}`}>
        <p className="text-customBase font-bold py-1">{article.title}</p>
        <p className="text-sm py-1">{article.sub_title}</p>
      </NavLink>
      <div>
        <IconButton color="success" onClick={handleOpen}>
          <MdOutlineBookmarkAdded size={25} />
        </IconButton>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove from reading list?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
