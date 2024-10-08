
import { renderThumbnails, thumbnailContainerElement } from './thumbnails.js';
import { openModal } from './picture-modal.js';

const initializeGallery = (photos) => {

  renderThumbnails(photos);

  thumbnailContainerElement.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('[data-thumbnail-id]');

    if (thumbnailElement) {
      openModal(photos.find((photo) => photo.id === Number(thumbnailElement.dataset.thumbnailId)));
    }
  });

};

export {initializeGallery};
