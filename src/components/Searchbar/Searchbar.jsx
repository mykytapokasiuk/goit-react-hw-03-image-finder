import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <div className={css.container}>
        <form className={css.form} onSubmit={onSubmit}>
          <input
            type="text"
            name="searchQuery"
            autoComplete="off"
            placeholder="Search images and photos"
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
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
