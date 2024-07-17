import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";

import store from "../../store";
import { logout } from "../../services/sessionService";
import SignUpFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import {
  clearArticleDetails,
  clearUserArticles,
} from "../../store/toolkitArticle";
import { clearCurrentUserComments } from "../../store/toolkitComment";
function ProfileButton({ sessionUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(sessionUser);
  useEffect(() => {
    //sets state for session user
    setUser(sessionUser);
  }, [sessionUser]);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    //close menu
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

  const handleLogout = (e) => {
    e.preventDefault();
    store.dispatch(logout()).then(() => {
      store.dispatch(clearUserArticles());
      store.dispatch(clearCurrentUserComments());
      store.dispatch(clearArticleDetails());
      closeMenu();
      navigate("/");
    });
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      {user?.id ? (
        <button id="profile-button" onClick={toggleMenu}>
          <img
            id="user-profile-icon"
            src={`https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=250`}
          />
        </button>
      ) : (
        <ul id="navbar-login-items-container">
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
        </ul>
      )}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              <p>
                Hi, {user.firstName} {user.lastName}
              </p>
            </li>

            <li>
              <button onClick={handleLogout}>Log Out</button>
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
    </div>
  );
}

export default ProfileButton;
