import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  onInputChange = evt => {
    this.setState({
      searchValue: evt.currentTarget.value,
    });
  };

  onFormSubmit = evt => {
    const { searchValue } = this.state;
    evt.preventDefault();

    if (!searchValue.trim()) {
      return toast.error('Sorry... Your input is invalid', {
        autoClose: 2500,
        pauseOnHover: false,
      });
    }

    this.props.onSubmit(searchValue.trim());
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchFormButton>
            <GoSearch size="24" />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
