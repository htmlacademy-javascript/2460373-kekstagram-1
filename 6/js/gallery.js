import { generatePhotos } from './data.js';
import { renderThumbnails, thumbnailContainer } from './thumbnails.js';
import { openModal } from './picture-modal.js';

const photosData = generatePhotos();

renderThumbnails(photosData);

thumbnailContainer.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    openModal(photosData.find((element) => element.id === Number(evt.target.dataset.id)));
  }
});
