import "../../assets/components/CommentCard.css";
import AuthorCard from "../AuthorCard/AuthorCard";
import CommentDropdown from "../CommentDropdown";
import { SlOptions } from "react-icons/sl";

export default function CommentCard({ comment, sessionUser }) {
  if (!comment || !sessionUser) return <h1>loading</h1>;
  const isOwnComment = comment.User.id === sessionUser.id;

  // console.log({
  //   isOwnComment,
  //   parentCommentId,
  // });
  return (
    <div
      className={`comment-card-container ${comment.parent ? "child-comment" : ""}`}
    >
      {" "}
      <div>
        <AuthorCard
          owner={comment.User}
          updatedAt={comment.updatedAt}
          isArticle={false}
        />
        <CommentDropdown
          parentCommentId={comment.id}
          isOwnComment={isOwnComment}
          articleId={comment.parent_article}
        />
      </div>
      <div className="comment-card-body">
        <p>
          {comment.parent?.User && (
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
