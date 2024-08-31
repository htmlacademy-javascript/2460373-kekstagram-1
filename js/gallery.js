
import { renderThumbnails, thumbnailContainer } from './thumbnails.js';
import { openModal } from './picture-modal.js';

const initializeGallery = (photos) => {
  const pictureElements = thumbnailContainer.querySelectorAll('.picture');
  pictureElements.forEach((element) => {
    element.remove();
  });

  renderThumbnails(photos);

  thumbnailContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (thumbnail) {
      openModal(photos.find((element) => element.id === Number(thumbnail.dataset.thumbnailId)));
    }
  });

};

export {initializeGallery};
