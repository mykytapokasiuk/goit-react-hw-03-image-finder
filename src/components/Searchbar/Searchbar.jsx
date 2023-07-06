import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form_element = event.currentTarget;
    const searchQuery = form_element.elements.searchQuery.value.trim();
    onSubmit(searchQuery, form_element);
  };
  return (
    <header className={css.searchbar}>
      <div className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images and photos..."
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Go
          </button>
        </form>
      </div>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
