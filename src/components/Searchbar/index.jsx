import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const onFormSubmit = evt => {
    evt.preventDefault();

    if (!searchValue.trim()) {
      return toast.error('Sorry... Your input is invalid', {
        autoClose: 2500,
        pauseOnHover: false,
      });
    }

    onSubmit(searchValue.trim());
    setSearchValue('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormButton>
          <GoSearch size="24" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
