import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from '../../services/pixabayAPI';

export default function ImageGallery({ searchValue, toggleModal }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const mount = useRef(true);

  useEffect(() => {
    if (!searchValue) return;

    const fetchImages = async () => {
      try {
        setPage(1);
        setLoading(true);
        setImages([]);
        const newImages = await getImagesBySearchQuery(searchValue, 1);

        if (!newImages) {
          toast.error('Sorry... There are no images', {
            autoClose: 2500,
            pauseOnHover: false,
          });
          return;
        }

        setImages(newImages.hits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchValue]);

  useEffect(() => {
    if (mount.current || page === 1) {
      mount.current = false;
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const newImages = await getImagesBySearchQuery(searchValue, page);

        if (!newImages) {
          toast.error('Sorry... There are no such images', {
            autoClose: 2500,
            pauseOnHover: false,
          });
          return;
        }

        setImages(prevImages => [...prevImages, ...newImages.hits]);
      } catch (error) {
        console.error('Error fetching more images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, searchValue]);

  return (
    <>
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            smallImg={image.webformatURL}
            largeImg={image.largeImageURL}
            tags={image.tags}
            toggleModal={() => toggleModal(image.largeImageURL)}
          />
        ))}
      </Gallery>

      {loading && <Loader />}

      {images.length > 0 && (
        <Button onClick={() => setPage(prev => prev + 1)} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

// export default class ImageGallery extends Component {

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchValue !== this.props.searchValue) {
//       this.setState(
//         { images: [], isLoading: true, currentPage: 1 },
//         this.fetchImages
//       );
//     }
//   }

//   onLoadMoreClick = () => {
//     this.setState(
//       prevState => ({
//         isLoading: true,
//         currentPage: prevState.currentPage + 1,
//       }),
//       this.fetchImages
//     );
//   };

//   fetchImages = async () => {
//     const { currentPage } = this.state;
//     const { searchValue } = this.props;

//     try {
//       const newImages = await getImagesBySearchQuery(searchValue, currentPage);

//       if (!newImages) {
//         return toast.error('Sorry... There are no such images', {
//           autoClose: 2500,
//           pauseOnHover: false,
//         });
//       }

//       this.setState(prevState => ({
//         images: [...prevState.images, ...newImages.hits],
//         imagesLoading: true,
//       }));

//       if (newImages.hits.length < 12) this.setState({ imagesLoading: false });
//     } catch (error) {
//       this.errorResponse(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   errorResponse = error => {
//     this.setState({ error: error.message }, () => {
//       toast.error(`Sorry... There was an error: ${this.state.error}`, {
//         autoClose: 2500,
//         pauseOnHover: false,
//       });
//     });
//   };
// }
