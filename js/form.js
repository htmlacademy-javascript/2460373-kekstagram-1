import { isEscapeKey } from './util.js';
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
  if (isEscapeKey(evt)) {
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

const validateHashtags = (values) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!values) {
    return true;
  }

  values = values.toLowerCase().trim().split(' ');

  const duplicates = values.filter((value, index, valueArray) => valueArray.indexOf(value) !== index);

  if (duplicates.length) {
    return false;
  }

  if (values.length > 5) {
    return false;
  }

  for (let i = 0; i < values.length; i++) {
    if (!hashtagRegex.test(values[i])) {
      return false;
    }
  }

  return true;
};

pristine.addValidator(hashtagField, validateHashtags, 'неправильный хештег');

// я хотел реализовать отключение закрытия по клавише через event.stopPropagation, но быстро не придумал, как это сделать и решил пойти о лёгкому пути :(
hashtagField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagField.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
