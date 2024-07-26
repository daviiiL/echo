import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
function ProfileButton({ sessionUser }) {
  if (sessionUser?.id) return null;
  return (
    <>
      <OpenModalMenuItem
        itemText="Log In"
        icon={
          <LoginIcon
            sx={{
              fontSize: "30px",
            }}
          />
        }
        modalComponent={<LoginFormModal />}
      />

      <OpenModalMenuItem
        itemText="Sign Up"
        icon={
          <PersonAddAltIcon
            sx={{
              fontSize: "30px",
            }}
          />
        }
        modalComponent={<SignUpFormModal />}
      />
    </>
  );
}

export default ProfileButton;
