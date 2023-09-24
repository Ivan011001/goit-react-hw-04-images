import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';
import { GlobalStyle } from 'GlobalStyle.styled';

export default function ImageGalleryItem({ smallImg, tags, largeImg }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const toggleModal = img => {
    setModalOpened(prev => !prev);
    setModalImage(img);
  };

  return (
    <>
      <GlobalStyle $modalOpened={modalOpened} />

      <GalleryItem onClick={() => toggleModal(largeImg)}>
        <GalleryImage src={smallImg} alt={tags} />
      </GalleryItem>
      {modalOpened && <Modal toggleModal={toggleModal} img={modalImage} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
