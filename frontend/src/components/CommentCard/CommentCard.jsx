import "../../assets/components/CommentCard.css";
import AuthorCard from "../AuthorCard/AuthorCard";
import CommentDropdown from "../CommentDropdown";

export default function CommentCard({ comment, sessionUserId }) {
  if (!comment) return <h1>loading</h1>;
  comment = { ...comment };
  const deletedUser = {
    id: -1,
    first_name: "Deleted",
    last_name: "Comment",
  };
  if (!comment.User) comment.User = deletedUser;
  const isOwnComment = comment.User.id === sessionUserId;
  return (
    <div
      className={`comment-card-container ${comment.parent ? "child-comment" : ""}`}
    >
      <div>
        {comment.User.id !== -1 && (
          <AuthorCard
            owner={comment.User}
            updatedAt={comment.updatedAt}
            isArticle={false}
          />
        )}
        {comment.User.id !== -1 && sessionUserId && (
          <CommentDropdown
            currentCommentId={comment.id}
            isOwnComment={isOwnComment}
            sessionUserId={sessionUserId}
            articleId={comment.parent_article}
          />
        )}
      </div>
      <div className="comment-card-body">
        <p>
          {comment.User.id !== -1 && comment.parent?.User && (
            <span>
              <span>
                <span className="comment-user-name">{`${comment.User.first_name} ${comment.User.last_name}`}</span>{" "}
                replies to{" "}
                <span className="comment-user-name">{`${comment.parent.User.first_name} ${comment.parent.User.last_name}`}</span>
                {": "}
              </span>
            </span>
          )}
          {comment.body}
        </p>
      </div>
    </div>
  );
}
