import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { AppContainer } from './App.styled';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

export default function App() {
  const [searchValue, setSearchValue] = useState('');

  const onSearchFormSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <AppContainer>
        <Searchbar onSubmit={onSearchFormSubmit} />
        <ImageGallery searchValue={searchValue} />
        <ToastContainer />
      </AppContainer>
    </>
  );
}
