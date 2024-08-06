import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit, CiShoppingTag } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";
import ConfirmDeletionModal from "../ConfirmDeletionModal";
import OpenModalText from "../OpenModalButton/OpenModalText";
import { useNavigate } from "react-router-dom";
import { forwardRef, useRef, useState } from "react";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/components/ArticleDropdown.css";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import ManageTagBar from "../ManageTagBar";
import store from "../../store";
import {
  clearArticleTags,
  fetchArticleTags,
  postArticletags,
} from "../../store/tag";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticleDropdown({ article }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [open, setOpen] = useState(false);
  const tagsRef = useRef([]);

  const setTags = (tags) => {
    tagsRef.current = tags;
  };

  const handleClickOpen = () => {
    store.dispatch(fetchArticleTags(article.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    store.dispatch(clearArticleTags());
  };

  const handleSubmit = () => {
    //tagsRef will remain empty less tags are added/removed to/from article

    console.log(tagsRef.current);
    // if (tagsRef.current.length)
    //   store.dispatch(
    //     postArticletags({
    //       articleId: article.id,
    //       tags: tagsRef.current,
    //     })
    //   );
    setOpen(false);
    store.dispatch(clearArticleTags());
    tagsRef.current = [];
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const navigateToEditArticle = (e) => {
    e.preventDefault();
    setShowMenu(false);
    navigate(`/articles/${article.id}/edit`, {
      state: { data: article },
    });
  };
  const closeMenu = () => setShowMenu(false);
  const ulClassName = "article-dropdown" + (showMenu ? "" : " hidden");
  return (
    <div className="article-dropdown-container">
      <div className="article-toggle-container" onClick={toggleMenu}>
        <SlOptionsVertical />
      </div>
      <ul className={ulClassName} ref={ulRef} onClick={toggleMenu}>
        <li onClick={navigateToEditArticle}>
          <div>
            <p>Edit</p>
            <CiEdit strokeWidth={1} />
          </div>
        </li>
        <li>
          <OpenModalText
            modalComponent={
              <ConfirmDeletionModal
                articleId={article.id}
                deletionType="article"
              />
            }
            onModalClose={closeMenu}
            itemText="Delete"
            iconComponent={<RiDeleteBin4Line />}
          />
        </li>
        <li>
          <div onClick={handleClickOpen}>
            <p>Add tags</p>
            <CiShoppingTag strokeWidth={1} />
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar variant="dense" sx={{ backgroundColor: "#82a1cc" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Manage your article tags
                </Typography>
                <Button
                  variant="outlined"
                  autoFocus
                  color="inherit"
                  onClick={handleSubmit}
                >
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <ManageTagBar articleId={article.id} setTags={setTags} />
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </div>
  );
}
