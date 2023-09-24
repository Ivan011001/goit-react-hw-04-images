import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Component } from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from '../../services/pixabayAPI';

export default class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    currentPage: 1,
    error: null,
  };

  static propTypes = {
    searchValue: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState(
        { images: [], isLoading: true, currentPage: 1 },
        this.fetchImages
      );
    }
  }

  onLoadMoreClick = () => {
    this.setState(
      prevState => ({
        isLoading: true,
        currentPage: prevState.currentPage + 1,
      }),
      this.fetchImages
    );
  };

  fetchImages = async () => {
    const { currentPage } = this.state;
    const { searchValue } = this.props;

    try {
      const newImages = await getImagesBySearchQuery(searchValue, currentPage);

      if (!newImages) {
        return toast.error('Sorry... There are no such images', {
          autoClose: 2500,
          pauseOnHover: false,
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages.hits],
        imagesLoading: true,
      }));

      if (newImages.hits.length < 12) this.setState({ imagesLoading: false });
    } catch (error) {
      this.errorResponse(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  errorResponse = error => {
    this.setState({ error: error.message }, () => {
      toast.error(`Sorry... There was an error: ${this.state.error}`, {
        autoClose: 2500,
        pauseOnHover: false,
      });
    });
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <>
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              smallImg={image.webformatURL}
              largeImg={image.largeImageURL}
              tags={image.tags}
              toggleModal={() => this.props.toggleModal(image.largeImageURL)}
            />
          ))}
        </Gallery>

        {isLoading && <Loader />}

        {images.length > 0 && <Button onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
