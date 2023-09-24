import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { GlobalStyle } from 'GlobalStyle.styled';
import { AppContainer } from './App.styled';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from 'components/Modal';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const onSearchFormSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  const toggleModal = img => {
    setModalOpened(prev => !prev);
    setModalImage(img);
  };

  return (
    <>
      <GlobalStyle $modalOpened={modalOpened} />
      <AppContainer>
        <Searchbar onSubmit={onSearchFormSubmit} />
        <ImageGallery searchValue={searchValue} toggleModal={toggleModal} />
        {modalOpened && <Modal toggleModal={toggleModal} img={modalImage} />}
        <ToastContainer />
      </AppContainer>
    </>
  );
}
