import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ visibleData, onCloseModal }) => {
  return (
    <div className={css.overlay}>
      <button
        type="button"
        className={css.modalCloseBtn}
        onClick={onCloseModal}
      >
        x
      </button>
      <div className={css.modal}>
        <img
          className={css.largeImage}
          src={visibleData.largeImageURL}
          alt={visibleData.tags}
        />
        <div className={css.tags}>{visibleData.tags}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  visibleData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
