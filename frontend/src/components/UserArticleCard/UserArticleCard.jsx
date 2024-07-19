import { useNavigate } from "react-router-dom";
import "../../assets/components/UserArticleCard.css";
import ArticleDropdown from "../ArticleDropdown/ArticleDropdown";

export default function UserArticleCard({ article }) {
  const navigate = useNavigate();

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
        <ArticleDropdown article={article} />
      </div>
    </div>
  );
}
