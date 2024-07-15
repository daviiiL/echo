import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/components/UserArticleCard.css";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";

export default function UserArticleCard({ article }) {
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
  const closeMenu = () => setShowMenu(false);
  const ulClassName =
    "user-content-card-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="user-content-card">
      <div
        className="article-details"
        onClick={() => navigate(`/articles/${article.id}`)}
      >
        <p className="title-small">{article.title}</p>
        <p className="subtitle-small">{article.sub_title}</p>
      </div>
      <div>
        <SlOptionsVertical className="clickable" onClick={toggleMenu} />
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <li onClick={closeMenu}>
          <div>
            <p>Edit Article</p>
            <CiEdit />
          </div>
        </li>
        <li onClick={closeMenu}>
          <div>
            <p>Delete Article</p>
            <RiDeleteBin4Line />
          </div>
        </li>
      </ul>
    </div>
  );
}
