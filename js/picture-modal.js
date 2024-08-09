const MAX_COMMENTS_ON_OPEN = 5;
const COMMENTS_PER_PORTION = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bodyElement = document.body;

const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');

const likesCount = bigPictureModal.querySelector('.likes-count');
const modalCaption = bigPictureModal.querySelector('.social__caption');
const commentsCount = bigPictureModal.querySelector('.social__comment-count');
const commentsCounter = bigPictureModal.querySelector('.comments-count');
const commentsShownElement = bigPictureModal.querySelector('.comments-shown');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const commentsList = bigPictureModal.querySelector('.social__comments');

const closeModalButton = bigPictureModal.querySelector('#picture-cancel');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let comments = [];
let commentsAmount = 0;
let commentsShown = MAX_COMMENTS_ON_OPEN;

const getCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAuthorAvatar = commentElement.querySelector('.social__picture');

  commentAuthorAvatar.src = commentData.avatar;
  commentAuthorAvatar.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const renderMoreComments = () => {
  // debugger;
  const newCommentsFragment = document.createDocumentFragment();
  const commentsToShow = commentsShown + COMMENTS_PER_PORTION;
  for (let i = commentsShown; i <= commentsToShow - 1; i++) {
    newCommentsFragment.append(getCommentElement(comments[i]));

    commentsShown++;
    commentsShownElement.textContent = commentsShown;

    if (commentsShown === comments.length) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
  commentsList.append(newCommentsFragment);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', renderMoreComments);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

const openModal = (photoInfo) => {

  commentsShown = MAX_COMMENTS_ON_OPEN;
  commentsList.innerHTML = '';

  comments = photoInfo.comments;
  commentsAmount = comments.length;

  for (let i = 0; i < MAX_COMMENTS_ON_OPEN; i++) {
    if (i > commentsAmount - 1) {
      commentsShownElement.textContent = commentsAmount;
      break;
    }

    const comment = comments[i];
    commentsList.append(getCommentElement(comment));

    if (commentsAmount === 1) {
      commentsCount.textContent = '1 из 1 комментария';
      break;
    }

    commentsShownElement.textContent = i + 1;
  }

  commentsLoader.classList.add('hidden');
  if (commentsAmount > MAX_COMMENTS_ON_OPEN) {
    commentsLoader.classList.remove('hidden');
  }

  commentsLoader.addEventListener('click', renderMoreComments);

  bigPictureImg.src = photoInfo.url;
  commentsCounter.textContent = photoInfo.comments.length;
  likesCount.textContent = photoInfo.likes;
  modalCaption.textContent = photoInfo.description;

  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

closeModalButton.addEventListener('click', () => {
  closeModal();
});

export { openModal };
