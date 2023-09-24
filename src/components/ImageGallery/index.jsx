import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { getImagesBySearchQuery } from '../../services/pixabayAPI';

export default function ImageGallery({ searchValue }) {
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
};
