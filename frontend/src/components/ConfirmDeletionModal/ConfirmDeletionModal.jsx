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
    <div style={{ padding: "5em" }}>
      <p>{`${id}`}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}
