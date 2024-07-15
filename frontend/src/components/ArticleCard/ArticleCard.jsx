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
            <p>
              <span className="quote">{`"`}</span>
              {stripHTMLTags(article.body).slice(0, 100) + "..."}

              <br></br>
              <span
                className="quote"
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >{`"`}</span>
            </p>
          </>
        )}
      </div>
      <div className="article-card-info-container">
        <p className="title-small">{article.title}</p>
        {article.title.length < 27 && (
          <p className="subtitle-small">
            {article.sub_title.slice(0, 25) + "..."}
          </p>
        )}

        <p className="date-small">{formatDatabaseDate(article.updatedAt)}</p>
      </div>
    </div>
  );
}
