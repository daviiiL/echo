import "../../assets/components/ArticleCard.css";
import { formatDatabaseDate } from "../../utils/formatDatabaseDate";
//do not show subheader if article title is too long

const stripHTMLTags = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function ArticleCard({ article }) {
  return (
    <div className="article-card-container">
      <div className="article-card-preview-container">
        {article.preview_image_url ? (
          <img src={article.preview_image_url} alt={article.title} />
        ) : (
          <>
            <span className="quote block h-5 pl-2">{`"`}</span>
            <p className="text-wrap truncate">{stripHTMLTags(article.body)}</p>

            <span className="quote block h-7 text-right pr-3">{`"`}</span>
          </>
        )}
      </div>
      <div className="article-card-info-container">
        <p className="title-small">
          {article.title.length > 40
            ? article.title.slice(0, 40) + "..."
            : article.title}
        </p>
        <p className="date-small">{formatDatabaseDate(article.updatedAt)}</p>
      </div>
    </div>
  );
}
