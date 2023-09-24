import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ smallImg, tags, toggleModal }) {
  return (
    <GalleryItem onClick={toggleModal}>
      <GalleryImage src={smallImg} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
