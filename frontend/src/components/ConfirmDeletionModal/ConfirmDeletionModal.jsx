import "../../assets/components/ConfirmDeletionModal.css";
import { useModal } from "../../context/Modal";
import { deleteArticle } from "../../store/article";
import store from "../../store";
import { MdOutlineClear } from "react-icons/md";
import { deleteComment } from "../../store/comment";
import { clearDeletedArticleComments } from "../../services/commentThunks";
import notify from "../Toaster/notify";
export default function ConfirmDeletionModal(props) {
  // const errors = useState((state) => state.articles.errors);
  const id = props.articleId ? props.articleId : props.commentId;
  const deletionType = props.deletionType;
  const { closeModal } = useModal();
  const handleDelete = (e) => {
    e.preventDefault();
    props.articleId !== undefined
      ? store.dispatch(deleteArticle(id)).then(() => {
          clearDeletedArticleComments(id);
          notify({
            message: "your article is now deleted",
            icon: "🗑️",
            color: "green",
            position: "top-left",
          });
        })
      : store.dispatch(deleteComment(id)).then(() => {
          notify({
            message: "your comment is now deleted",
            icon: "🗑️",
            color: "green",
            position: "top-left",
          });
        });
    closeModal();
  };

  return (
    <div className="confirm-deletion-modal-container">
      <div>
        <MdOutlineClear
          size={30}
          onClick={closeModal}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="deletion-modal-conf">
        <p>
          Are you sure you want to delete this {`${deletionType}`}? This action
          cannot be undone.
        </p>
      </div>
      <div className="deletion-modal-button-container">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  );
}
