import "../../assets/components/ConfirmDeletionModal.css";
import { useModal } from "../../context/Modal";

export default function ConfirmDeletionModal({ id }) {
  const { closeModal } = useModal();
  const handleDelete = (e) => {
    e.preventDefault();
    window.alert(`Pressed delete on id ${id}`);
    closeModal();
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </>
  );
}
