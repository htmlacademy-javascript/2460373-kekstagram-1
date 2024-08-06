import { openModal } from './picture-modal.js';

const thumbnailContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');

  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnailImg.dataset.id = id;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const thumbnailsFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    thumbnailsFragment.append(getThumbnail(photo));
  }
  );

  thumbnailContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      openModal(photos.find((element) => element.id === Number(evt.target.dataset.id)));
    }
  });

  thumbnailContainer.append(thumbnailsFragment);
};

export { renderThumbnails };

