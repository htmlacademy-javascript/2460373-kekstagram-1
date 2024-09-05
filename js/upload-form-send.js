import { uploadFormElement, isEscapeKey, bodyElement } from './util.js';
import { sendData } from './api.js';
import { pristine } from './upload-form-validation.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const submitButtonElement = document.querySelector('#upload-submit');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const deleteMessage = () => {
  const messageElement = document.querySelector('.message');
  document.removeEventListener('keydown', onDocumentKeydown);
  messageElement.remove();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    deleteMessage();
  }
}

const renderMessage = (messageTemplate) => {
  const messageElement = messageTemplate.cloneNode(true);
  const buttonElement = messageElement.querySelector('buttonElement');
  buttonElement.addEventListener('click', () => {
    deleteMessage();
  });
  messageElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.message')) {
      deleteMessage();
    }
  });
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.insertAdjacentElement('beforeend', messageElement);
};

const manageFormSending = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          renderMessage(successMessageTemplate);
        })
        .catch(() => {
          renderMessage(errorMessageTemplate);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { manageFormSending };
