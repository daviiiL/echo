import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import store from "../../../store";
import { logout } from "../../../services/sessionThunks";
import {
  clearArticleDetails,
  clearUserArticles,
  clearUserSubscriptions,
} from "../../../store/article";
import { clearCurrentUserComments } from "../../../store/comment";
import { useNavigate } from "react-router-dom";
import notify from "../../Toaster/notify";

export default function UserProfileMenu({ sessionUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    store.dispatch(logout()).then(() => {
      //cleaning redux store after user logs out successfully
      store.dispatch(clearUserArticles());
      store.dispatch(clearCurrentUserComments());
      store.dispatch(clearArticleDetails());
      store.dispatch(clearUserSubscriptions());
      setOpen(false);
      navigate("/");
      notify({
        message: `till next time`,
        icon: "👏",
        position: "top-left",
        color: "white",
      });
    });
  };

  return (
    <Fragment>
      <button id="profile-button" onClick={handleClickOpen}>
        <img
          id="user-profile-icon"
          src={`https://eu.ui-avatars.com/api/?name=${sessionUser.firstName}+${sessionUser.lastName}&size=250`}
        />
      </button>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: "absolute",
            left: "3em",
            top: "5em",
            boxShadow: "0 0 2px lightgrey",
            borderRadius: "1em",
            border: "1px solid lightgrey",
          },
        }}
        hideBackdrop={true}
      >
        <DialogTitle>
          Hi,{" "}
          <span className="font-sans font-normal">{`${sessionUser.firstName}`}</span>
          !
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="outlined" size={"small"} onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
