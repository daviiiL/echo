import { useModal } from "../../context/Modal";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  icon,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li onClick={onClick} className="nav-items flex-col cursor-pointer">
      {icon}
      <p className="text-xs text-gray-500">{itemText.toLowerCase()}</p>
    </li>
  );
}

export default OpenModalMenuItem;
