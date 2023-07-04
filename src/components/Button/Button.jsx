import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.loadMoreBtn}
        onClick={() => {
          onLoadMore();
        }}
      >
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
