import "../../assets/components/ConfirmDeletionModal.css";
import { useModal } from "../../context/Modal";
import { deleteArticle } from "../../store/toolkitArticle";
import store from "../../store";
import { MdOutlineClear } from "react-icons/md";

export default function ConfirmDeletionModal(props) {
  // const errors = useState((state) => state.articles.errors);
  const id = props.articleId ? props.articleId : props.commentId;
  const deletionType = props.deletionType;
  const { closeModal } = useModal();
  const handleDelete = (e) => {
    e.preventDefault();
    store.dispatch(deleteArticle(id));
    closeModal();
  };

  return (
    <div className="confirm-deletion-modal-container">
      <div>
        <MdOutlineClear size={30} />
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
