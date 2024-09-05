import { isEscapeKey, uploadForm, hashtagField, imgPreviewElement, bodyElement } from './util.js';
import { resetScaleValue } from './upload-picture-scale.js';
import { pristine } from './upload-form-validation.js';
import { manageFormSending } from './upload-form-send.js';
import { initializeEffects, resetEffects } from './upload-picture-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const modalElement = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInputElement = uploadForm.querySelector('#upload-file');
const closeButtonElement = uploadForm.querySelector('#upload-cancel');
const descriptionFieldElement = uploadForm.querySelector('.text__description');
const effectPreviewElements = uploadForm.querySelectorAll('.effects__preview');

const openModal = () => {
  bodyElement.classList.add('modal-open');
  modalElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  resetEffects();
  resetScaleValue();
  pristine.reset();
};

function onDocumentKeydown(evt) {
  const activeElement = document.activeElement;
  const isErrorMessage = document.querySelector('.error');
  const areFieldsActive = activeElement === hashtagField || activeElement === descriptionFieldElement;
  if (isEscapeKey(evt) && !areFieldsActive && !isErrorMessage) {
    closeModal();
  }
}

const setEffectPreview = (photo) => {
  effectPreviewElements.forEach((element) => {
    element.style.backgroundImage = `url('${photo}')`;
  });
};

const renderPhoto = (source) => {
  const file = source.files[0];
  const fileName = file.name.toLowerCase();

  const isMatching = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isMatching) {
    imgPreviewElement.src = URL.createObjectURL(file);
    setEffectPreview(URL.createObjectURL(file));
    openModal();
  }
};

const initializeUploadModal = () => {
  uploadFileInputElement.addEventListener('change', () => {
    renderPhoto(uploadFileInputElement);
  });

  closeButtonElement.addEventListener('click', () => {
    closeModal();
  });

  manageFormSending(closeModal);
  initializeEffects();
};

export { initializeUploadModal };
