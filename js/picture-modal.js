import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bodyElement = document.body;

const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');

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
  const commentAuthorAvatar = commentElement.querySelector('.social__picture');

  commentAuthorAvatar.src = commentData.avatar;
  commentAuthorAvatar.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

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

  document.addEventListener('keydown', onDocumentKeydown);

};

closeModalButton.addEventListener('click', () => {
  closeModal();
});

export { openModal };
