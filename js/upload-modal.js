import { isEscapeKey, uploadForm, hashtagField, imgPreviewElement, bodyElement } from './util.js';
import { resetScaleValue } from './upload-picture-scale.js';
import { pristine } from './upload-form-validation.js';
import { manageFormSending } from './upload-form-send.js';
import { initializeEffects, resetEffects } from './upload-picture-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadEditor = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');
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
  resetEffects();
  resetScaleValue();
  pristine.reset();
};

function onDocumentKeydown(evt) {
  const activeElement = document.activeElement;
  const isErrorMessage = document.querySelector('.error');
  const areFieldsActive = activeElement === hashtagField || activeElement === descriptionField;
  if (isEscapeKey(evt) && !areFieldsActive && !isErrorMessage) {
    closeEditorModal();
  }
}

const renderPhoto = (source) => {
  const file = source.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    imgPreviewElement.src = URL.createObjectURL(file);
  }
};

const initializeUploadModal = () => {
  uploadFileInput.addEventListener('change', () => {
    openEditorModal();
    renderPhoto(uploadFileInput);
  });

  closeButton.addEventListener('click', () => {
    closeEditorModal();
  });

  manageFormSending(closeEditorModal);
  initializeEffects();
};

export { initializeUploadModal };
