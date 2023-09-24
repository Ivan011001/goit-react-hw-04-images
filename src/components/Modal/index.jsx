import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalWindow, Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, img }) {
  useEffect(() => {
    const escapeHandlePress = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', escapeHandlePress);

    return () => {
      document.removeEventListener('keydown', escapeHandlePress);
    };
  }, [toggleModal]);

  const overlayHandleClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      {createPortal(
        <Overlay onClick={overlayHandleClick}>
          <ModalWindow>
            <ModalImg src={img} />
          </ModalWindow>
        </Overlay>,
        modalRoot
      )}
    </>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};
