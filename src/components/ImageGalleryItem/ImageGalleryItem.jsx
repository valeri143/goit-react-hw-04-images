import { Modal} from "components/Modal/Modal"
import { useState } from "react";
import { StyledLi, StyledImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
  const openModal = () => {
     setModalIsOpen(true)
    };
  
   const  closeModal = () => {
      setModalIsOpen(false)
    };
        return (
            <StyledLi>
            <StyledImg src={webformatURL} alt={tags} onClick={openModal}/>
            <Modal largeImageURL={largeImageURL} tags={tags} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            </StyledLi>
            )
    }
