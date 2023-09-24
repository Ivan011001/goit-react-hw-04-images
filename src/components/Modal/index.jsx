import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { ModalWindow, Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escapeHandlePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeHandlePress);
  }

  overlayHandleClick = evt => {
    const { toggleModal } = this.props;

    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  escapeHandlePress = evt => {
    const { toggleModal } = this.props;

    if (evt.code === 'Escape') {
      toggleModal();
    }
  };

  render() {
    const { img } = this.props;

    return (
      <>
        {createPortal(
          <Overlay onClick={this.overlayHandleClick}>
            <ModalWindow>
              <ModalImg src={img} />
            </ModalWindow>
          </Overlay>,
          modalRoot
        )}
      </>
    );
  }
}
