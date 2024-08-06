
import { renderThumbnails, thumbnailContainer } from './thumbnails.js';
import { openModal } from './picture-modal.js';

const initializeGallery = (photos) => {
  renderThumbnails(photos);

  thumbnailContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture').matches('.picture')) {
      openModal(photos.find((element) => element.id === Number(evt.target.closest('.picture').dataset.id)));
    }
  });

};

export {initializeGallery};
