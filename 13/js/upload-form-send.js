import { uploadForm, isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { pristine } from './upload-form-validation.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const bodyElement = document.body;
const submitButton = document.querySelector('#upload-submit');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const deleteMessage = () => {
  const message = document.querySelector('.message');
  document.removeEventListener('keydown', onDocumentKeydown);
  message.remove();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    deleteMessage();
  }
}

const renderSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  const successButton = message.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    deleteMessage();
  });
  message.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      deleteMessage();
    }
  });
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.insertAdjacentElement('beforeend', message);
};

const renderErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  const errorButton = message.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    deleteMessage();
  });
  message.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      deleteMessage();
    }
  });
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.insertAdjacentElement('beforeend', message);
};

const manageFormSending = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(renderSuccessMessage)
        .catch(renderErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

export { manageFormSending };
