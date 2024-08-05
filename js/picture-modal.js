import { generatePhotos } from './data.js';

const bigPictureModal = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

const bigPictureImg = bigPictureModal.querySelector('.big-picture__img').querySelector('img');

const modalLikesCount = bigPictureModal.querySelector('.likes-count');
const modalCaption = bigPictureModal.querySelector('.social__caption');
const modalCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const modalCommentsCounter = bigPictureModal.querySelector('.comments-count');
const modalCommentsLoader = bigPictureModal.querySelector('.comments-loader');
const modalCommentsList = bigPictureModal.querySelector('.social__comments');

const closeModalButton = bigPictureModal.querySelector('#picture-cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const getCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = commentData.avatar;
  commentElement.querySelector('.social__picture').alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  document.removeEventListener('keydown', closeModalOnEsc);
};

const closeModalOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const openModal = (photoInfo) => {
  modalCommentsCount.classList.add('hidden');
  modalCommentsLoader.classList.add('hidden');

  bigPictureImg.src = photoInfo.url;
  modalCommentsCounter.textContent = photoInfo.comments.length;
  modalLikesCount.textContent = photoInfo.likes;
  modalCaption.textContent = photoInfo.description;

  modalCommentsList.innerHTML = '';
  photoInfo.comments.forEach((comment) => {
    modalCommentsList.append(getCommentElement(comment));
  }
  );

  bigPictureModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', closeModalOnEsc);

};

closeModalButton.addEventListener('click', () => {
  closeModal();
});

export {openModal};

// openModal(generatePhotos()[0]);
