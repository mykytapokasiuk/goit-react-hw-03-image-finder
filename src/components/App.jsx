import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import Loader from './Loader/Loader.jsx';
import { getImages } from 'services/api.js';
import {
  checkResponse,
  onError,
  onInputEmpty,
  onSameRequest,
} from 'services/utils.js';

export default class App extends Component {
  state = {
    modal: { isOpen: false, visibleData: null },
    images: [],
    isLoading: false,
    error: null,
    searchQuery: 'milky way',
    page: 1,
  };

  onOpenModal = data => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: { isOpen: false, visibleData: null },
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const form_element = event.currentTarget;
    const searchQuery = form_element.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      onInputEmpty();
    } else if (searchQuery === this.state.searchQuery) {
      onSameRequest(this.state.searchQuery);
      form_element.reset();
    } else {
      this.setState({
        searchQuery: searchQuery,
        images: [],
      });
      this.setState({ page: 1 });
      form_element.reset();
    }
  };

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  async componentDidMount() {
    const { searchQuery, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await getImages(searchQuery, page);
      this.setState({
        images: response.hits,
      });
    } catch (error) {
      this.setState({ error: error.message });
      onError(this.state.error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const response = await getImages(searchQuery, page);
        checkResponse(response, page);
        this.setState({
          images: [...this.state.images, ...response.hits],
        });
      } catch (error) {
        this.setState({ error: error.message });
        onError(this.state.error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { isLoading, images, modal } = this.state;
    return (
      <div>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 ? (
          <ImageGallery imagesArray={images} onOpenModal={this.onOpenModal} />
        ) : null}
        {images.length > 0 ? <Button onLoadMore={this.onLoadMore} /> : null}
        {this.state.modal.isOpen && (
          <Modal
            visibleData={modal.visibleData}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
