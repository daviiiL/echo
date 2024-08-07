import { Button } from "@mui/material";
import "../../assets/components/AuthorCard.css";
import { formatDataBaseActiveDate } from "../../utils/formatDatabaseDate";
import notify from "../Toaster/notify";

export default function AuthorCard({
  owner,
  readtime,
  publishDate,
  isArticle = true,
  sessionUserId,
}) {
  const handleFollow = () => {
    if (!sessionUserId)
      return notify({
        message: "Please login to follow",
        color: "white",
        icon: "🙋",
      });
    return notify({
      message: "Feature coming soon",
      color: "error",
    });
  };

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
              {owner.last_active && formatDataBaseActiveDate(owner.last_active)}
            </p>
          )}
          {isArticle && "•"}
          {isArticle && (
            <Button sx={{ color: "green" }} onClick={handleFollow}>
              Follow
            </Button>
          )}
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
