import { useEffect, useRef, useState } from "react";

import "../../assets/components/UserArticleCard.css";
import { SlOptions } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";
import ConfirmDeletionModal from "../ConfirmDeletionModal";
import OpenModalText from "../OpenModalButton/OpenModalText";
import { GoReply } from "react-icons/go";
import CommentForm from "../CommentForm/CommentForm";

export default function CommentDropdown({
  parentCommentId,
  isOwnComment,
  articleId,
  sessionUserId,
}) {
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
        <SlOptions onClick={toggleMenu} />
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {isOwnComment && (
          <>
            <li>
              <OpenModalText
                modalComponent={
                  <CommentForm
                    isModal={true}
                    authenticated={true}
                    newComment={false}
                    parentCommentId={parentCommentId}
                  />
                }
                onModalClose={closeMenu}
                itemText="Edit"
                iconComponent={<CiEdit />}
              />
            </li>
            <li>
              <OpenModalText
                modalComponent={
                  <ConfirmDeletionModal
                    commentId={parentCommentId}
                    deletionType="comment"
                  />
                }
                onModalClose={closeMenu}
                itemText="Delete"
                iconComponent={<RiDeleteBin4Line />}
              />
            </li>{" "}
          </>
        )}
        <li>
          <OpenModalText
            modalComponent={
              <CommentForm
                articleId={articleId}
                parentCommentId={parentCommentId}
                isModal={true}
                sessionUserId={sessionUserId}
                authenticated={true}
              />
            }
            onModalClose={closeMenu}
            itemText="Reply"
            iconComponent={<GoReply />}
          />
        </li>
      </ul>
    </div>
  );
}
