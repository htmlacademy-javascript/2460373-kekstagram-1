import { isEscapeKey, bodyElement } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureModal = document.querySelector('.big-picture');

const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');

const likesCount = bigPictureModal.querySelector('.likes-count');
const modalCaption = bigPictureModal.querySelector('.social__caption');
const commentsCountElement = bigPictureModal.querySelector('.comments-count');
const shownCommentsCountElement = bigPictureModal.querySelector('.comments-shown');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const commentsList = bigPictureModal.querySelector('.social__comments');

const closeModalButton = bigPictureModal.querySelector('#picture-cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let comments = [];
let shownCommentsCount = 0;

const getCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAuthorAvatar = commentElement.querySelector('.social__picture');

  commentAuthorAvatar.src = commentData.avatar;
  commentAuthorAvatar.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const updateCommentsCount = (newValue) => {
  shownCommentsCount = newValue;
  shownCommentsCountElement.textContent = shownCommentsCount;
  if (shownCommentsCount === comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();

  const newCommentsCount = Math.min(comments.length, shownCommentsCount + COMMENTS_PER_PORTION);

  for (let i = shownCommentsCount; i < newCommentsCount; i++) {
    fragment.append(getCommentElement(comments[i]));
  }
  updateCommentsCount(newCommentsCount);
  commentsList.append(fragment);
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
  commentsLoader.classList.remove('hidden');
  shownCommentsCount = 0;
  comments = photoInfo.comments;
  commentsList.innerHTML = '';
  renderComments();

  bigPictureImg.src = photoInfo.url;
  commentsCountElement.textContent = photoInfo.comments.length;
  likesCount.textContent = photoInfo.likes;
  modalCaption.textContent = photoInfo.description;

  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

closeModalButton.addEventListener('click', () => {
  closeModal();
});

commentsLoader.addEventListener('click', renderComments);

export { openModal };
