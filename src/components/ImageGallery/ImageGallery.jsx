import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imagesArray, onOpenModal }) => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <ul className={css.gallery}>
          {imagesArray.map(
            ({
              id,
              largeImageURL,
              webformatURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            }) => (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
                likes={likes}
                views={views}
                comments={comments}
                downloads={downloads}
                onOpenModal={onOpenModal}
              />
            )
          )}
        </ul>
      </div>
    </main>
  );
};

ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
