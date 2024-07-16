import { useEffect, useRef, useState } from "react";

import "../../assets/components/UserArticleCard.css";
import { SlOptions } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";
import ConfirmDeletionModal from "../ConfirmDeletionModal";
import OpenModalText from "../OpenModalButton/OpenModalText";
export default function CommentDropdown() {
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
  const ulClassName =
    "user-content-card-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="user-content-card">
      <div>
        <SlOptions className="clickable" onClick={toggleMenu} />
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <li>
          <div>
            <p>Edit Comment</p>
            <CiEdit />
          </div>
        </li>
        <li>
          <OpenModalText
            modalComponent={
              <ConfirmDeletionModal commentId={1} deletionType="comment" />
            }
            onModalClose={closeMenu}
            itemText="Delete Comment"
            iconComponent={<RiDeleteBin4Line />}
          />
        </li>
      </ul>
    </div>
  );
}
