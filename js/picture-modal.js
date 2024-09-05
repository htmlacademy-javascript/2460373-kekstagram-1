import { isEscapeKey, bodyElement } from './util.js';

const COMMENTS_PER_PORTION = 5;

const modalElement = document.querySelector('.big-picture');

const modalImgElement = modalElement.querySelector('.big-picture__img img');

const likesCountElement = modalElement.querySelector('.likes-count');
const modalCaptionElement = modalElement.querySelector('.social__caption');
const commentsCountElement = modalElement.querySelector('.comments-count');
const shownCommentsCountElement = modalElement.querySelector('.comments-shown');
const commentsLoaderElement = modalElement.querySelector('.comments-loader');
const commentsListElement = modalElement.querySelector('.social__comments');

const closeButtonElement = modalElement.querySelector('#picture-cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let comments = [];
let shownCommentsCount = 0;

const getCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAuthorImg = commentElement.querySelector('.social__picture');

  commentAuthorImg.src = commentData.avatar;
  commentAuthorImg.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const updateCommentsCount = (newValue) => {
  shownCommentsCount = newValue;
  shownCommentsCountElement.textContent = shownCommentsCount;
  if (shownCommentsCount === comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();

  const newCommentsCount = Math.min(comments.length, shownCommentsCount + COMMENTS_PER_PORTION);

  for (let i = shownCommentsCount; i < newCommentsCount; i++) {
    fragment.append(getCommentElement(comments[i]));
  }
  updateCommentsCount(newCommentsCount);
  commentsListElement.append(fragment);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const openModal = (photoInfo) => {
  commentsLoaderElement.classList.remove('hidden');
  shownCommentsCount = 0;
  comments = photoInfo.comments;
  commentsListElement.innerHTML = '';
  renderComments();

  modalImgElement.src = photoInfo.url;
  commentsCountElement.textContent = photoInfo.comments.length;
  likesCountElement.textContent = photoInfo.likes;
  modalCaptionElement.textContent = photoInfo.description;

  document.addEventListener('keydown', onDocumentKeydown);

  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

closeButtonElement.addEventListener('click', () => {
  closeModal();
});

commentsLoaderElement.addEventListener('click', () => {
  renderComments();
});

export { openModal };
