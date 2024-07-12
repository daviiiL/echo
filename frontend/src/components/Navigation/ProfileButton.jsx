import { useState } from "react";
import { OpenModalButton } from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
export default function ProfileButton() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        Profile
      </button>
      {showMenu && (
        <div
          className={showMenu ? "profile-dropdown" : "profile-dropdown hidden"}
        >
          <OpenModalButton modalComponent={LoginFormModal} buttonText="Login" />
        </div>
      )}
    </>
  );
}
