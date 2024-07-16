import "../../assets/components/ConfirmDeletionModal.css";
import { useModal } from "../../context/Modal";
import { deleteArticle } from "../../store/toolkitArticle";
import store from "../../store";
// import { useState } from "react";

export default function ConfirmDeletionModal(props) {
  // const errors = useState((state) => state.articles.errors);
  const id = props.articleId ? props.articleId : props.commentId;
  const { closeModal } = useModal();
  const handleDelete = (e) => {
    e.preventDefault();
    store.dispatch(deleteArticle(id));
    closeModal();
  };

  return (
    <div className="confirm-deletion-modal-container">
      <div className="deletion-modal-conf">
        <p className="modal-header">Confirm Deletion</p>
        <p className="modal-subheader">deletion is irrecoverable</p>
      </div>
      <div className="deletion-modal-button-container">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}
