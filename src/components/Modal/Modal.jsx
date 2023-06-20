import ReactModal from "react-modal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { customStyles, StyledImage } from "./Modal.styled";

export const Modal = ({ modalIsOpen, tags, largeImageURL, closeModal }) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
      onAfterOpen={() => disableBodyScroll(document)}
      onAfterClose={() => enableBodyScroll(document)}
    >
      <StyledImage  src={largeImageURL} alt={tags} style={customStyles.image}/>
    </ReactModal>
  );
};
