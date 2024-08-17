import { isEscapeKey, uploadForm, hashtagField } from './util.js';
import { resetScaleValue } from './upload-picture-scale.js';
import { initializeFormValidation } from './upload-form-validation.js';
import { initializeEffects } from './upload-picture-effects.js';

const bodyElement = document.body;
const uploadEditor = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const closeButton = uploadForm.querySelector('#upload-cancel');
const descriptionField = uploadForm.querySelector('.text__description');

const openEditorModal = () => {
  bodyElement.classList.add('modal-open');
  uploadEditor.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  resetScaleValue();
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

const initializeUploadModal = () => {
  uploadFileInput.addEventListener('change', () => {
    openEditorModal();
  });

  closeButton.addEventListener('click', () => {
    closeEditorModal();
  });

  initializeFormValidation();
  initializeEffects();
};

export { initializeUploadModal };
