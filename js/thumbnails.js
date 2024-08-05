import { openModal } from './picture-modal.js';

const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', () => {
    openModal({ url, description, likes, comments });
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const thumbnailsFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    thumbnailsFragment.append(getThumbnail(photo));
  }
  );
  thumbnailContainer.append(thumbnailsFragment);
};

export { renderThumbnails };

