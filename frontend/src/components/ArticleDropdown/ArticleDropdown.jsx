import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";
import ConfirmDeletionModal from "../ConfirmDeletionModal";
import OpenModalText from "../OpenModalButton/OpenModalText";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import "../../assets/components/ArticleDropdown.css";
export default function ArticleDropdown({ article }) {
  const navigate = useNavigate();
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
            <p>Edit Article</p>
            <CiEdit />
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
            itemText="Delete Article"
            iconComponent={<RiDeleteBin4Line />}
          />
        </li>
      </ul>
    </div>
  );
}
