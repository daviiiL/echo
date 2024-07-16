import { useModal } from "../../context/Modal";

function OpenModalText({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  iconComponent,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <div onClick={onClick}>
      <p>{itemText}</p>
      {iconComponent ? iconComponent : ""}
    </div>
  );
}

export default OpenModalText;
