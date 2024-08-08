import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
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
import { MdLogout } from "react-icons/md";

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
      <Tooltip
        title={
          <div className="p-2 flex-col">
            <p className="text-base">Echo Account</p>
            <p className="text-gray-300 text-sm">{`${sessionUser.firstName} ${sessionUser.lastName}`}</p>
            <p className="text-gray-300 text-sm">{sessionUser.email}</p>
          </div>
        }
      >
        <button id="profile-button" onClick={handleClickOpen}>
          <img
            id="user-profile-icon"
            src={`https://eu.ui-avatars.com/api/?name=${sessionUser.firstName}+${sessionUser.lastName}&size=250`}
          />
        </button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: "absolute",
            left: "2.5em",
            top: "5em",
            boxShadow: "0 0 2px lightgrey",
            borderRadius: "1.5em",
            border: "1px solid lightgrey",
          },
        }}
        hideBackdrop={true}
      >
        <DialogTitle style={{ paddingTop: 0 }}>
          <p className="text-sm w-full text-center text-gray-500">
            {sessionUser.email}
          </p>
        </DialogTitle>
        <DialogContent>
          <div className=" flex flex-col justify-center items-center ">
            <img
              className="rounded-full max-h-20"
              id="user-profile-icon"
              src={`https://eu.ui-avatars.com/api/?name=${sessionUser.firstName}+${sessionUser.lastName}&size=250`}
            />
            <p className="text-center text-xl mb-2">{`Hi, ${sessionUser.firstName}!`}</p>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              style={{ borderRadius: "2em", width: "100%" }}
              onClick={handleClose}
            >
              Manage your Echo account
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{ borderRadius: "2em" }}
            variant="contained"
            endIcon={<MdLogout />}
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
