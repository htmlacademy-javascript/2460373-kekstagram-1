import { isEscapeKey } from './util.js';

const Hashtag = {
  MAX_QTY: 5,
  MAX_LENGTH: 20
};

const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadEditor = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const openEditorModal = () => {
  bodyElement.classList.add('modal-open');
  uploadEditor.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditorModal = () => {
  bodyElement.classList.remove('modal-open');
  uploadEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
};

function onDocumentKeydown(evt) {
  const activeElement = document.activeElement;
  if (isEscapeKey(evt) && (activeElement !== hashtagField && activeElement !== descriptionField)) {
    closeEditorModal();
  }
}

uploadFileInput.addEventListener('change', () => {
  openEditorModal();
});

closeButton.addEventListener('click', () => {
  closeEditorModal();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const validateHashtagFormat = (string) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  const hashtags = string.toLowerCase().trim().split(' ').filter((hashtag) => hashtag);

  if (!hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
    return false;
  }

  return true;
};

const validateHashtagQty = (string) => {
  const hashtags = string.toLowerCase().trim().split(' ').filter((hashtag) => hashtag);

  if (hashtags.length > Hashtag.MAX_QTY) {
    return false;
  }

  return true;
};

// const validateHashtagLength = (string) => {
//   const hashtags = string.toLowerCase().trim().split(' ').filter((hashtag) => hashtag);
//   const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

//   if (!hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
//     return false;
//   }

//   return true;
// };

const validateHashtagUnique = (string) => {
  const hashtags = string.toLowerCase().trim().split(' ').filter((hashtag) => hashtag);

  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

pristine.addValidator(hashtagField, validateHashtagFormat, 'Неправильный формат хеш-тега', 1, true);
pristine.addValidator(hashtagField, validateHashtagQty, `Нельзя указать больше ${Hashtag.MAX_QTY} хэш-тегов`, 1, true);
pristine.addValidator(hashtagField, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды', 1, true);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
