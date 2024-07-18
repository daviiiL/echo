import "../../assets/components/UserCommentCard.css";
import { formatDatabaseDate } from "../../utils/formatDatabaseDate";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
//updated this component to utilize the CommentDropdown component
export default function UserCommentCard({ comment }) {
  if (!comment.commenter_id) return null;
  return (
    <div className="user-comment-card">
      <div className="comment-details">
        <p className="title-small">{`"${comment?.body}"`}</p>
        <p className="date-small">{formatDatabaseDate(comment?.updatedAt)}</p>
      </div>
      <div>
        <CommentDropdown
          currentCommentId={comment.id}
          isUserContent={true}
          isOwnComment={false}
        />
      </div>
    </div>
  );
}
