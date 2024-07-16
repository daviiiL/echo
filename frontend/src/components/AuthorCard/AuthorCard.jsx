import "../../assets/components/AuthorCard.css";
import { formatDataBaseActiveDate } from "../../utils/formatDatabaseDate";

export default function AuthorCard({
  owner,
  readtime,
  publishDate,
  isArticle = true,
}) {
  if (!owner) return <h1>loading</h1>;
  return (
    <div
      className={`author-card-container ${isArticle ? "" : " comment-card"}`}
    >
      <img
        src={`https://eu.ui-avatars.com/api/?name=${owner.first_name}+${owner.last_name}&size=250`}
      ></img>
      <div className={`author-card-info ${isArticle ? "" : " comment-card"}`}>
        <div>
          <p>{`${owner.first_name} ${owner.last_name}`}</p>
          {isArticle || (
            <p className="user-last-active-date">
              {formatDataBaseActiveDate(owner.last_active)}
            </p>
          )}
          {isArticle && "•"}
          {isArticle && <p className="follow-button">Follow</p>}
        </div>
        {isArticle && (
          <div>
            <p>
              Published on <span style={{ color: "black" }}>echo</span>
            </p>
            {"•"}
            <p>{`${Math.ceil(readtime.length / 1200)} min read`}</p>
            {"•"}
            <p>{publishDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
