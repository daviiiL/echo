import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { PiUserCircleThin } from "react-icons/pi";

import store from "../../store";
import { logout } from "../../services/sessionService";
import SignUpFormModal from "../SignupFormModal";
function ProfileButton({ sessionUser }) {
  const [user, setUser] = useState(sessionUser);
  useEffect(() => {
    // console.log("state updated");
    setUser(sessionUser);
  }, [sessionUser]);
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const closeMenu = () => setShowMenu(false);

  const onClick = (e) => {
    e.preventDefault();
    store.dispatch(logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button id="profile-button" onClick={toggleMenu}>
        {user?.id ? (
          <img
            id="user-profile-icon"
            src={`https://eu.ui-avatars.com/api/?name=${sessionUser?.first_name}+${sessionUser?.last_name}&size=250`}
          />
        ) : (
          <PiUserCircleThin size={50} />
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button onClick={onClick}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignUpFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
