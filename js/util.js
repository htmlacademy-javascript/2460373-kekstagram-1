const ALERT_SHOW_TIME = 5000;

const bodyElement = document.body;
const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.lineHeight = 'normal';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  bodyElement.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { uploadFormElement, hashtagFieldElement, imgPreviewElement, bodyElement, getRandomInteger, isEscapeKey, showAlert, debounce };
