import { imgPreviewElement } from './util.js';

const Scale = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100,
};

const scaleContainerElement = document.querySelector('.img-upload__scale');
const incButtonElement = scaleContainerElement.querySelector('.scale__control--bigger');
const decButtonElement = scaleContainerElement.querySelector('.scale__control--smaller');
const scaleInputElement = scaleContainerElement.querySelector('.scale__control--value');
let scaleNumberValue = Scale.DEFAULT_VALUE;

const setScaleValue = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const resetScaleValue = () => {
  scaleNumberValue = Scale.DEFAULT_VALUE;
  setScaleValue(scaleNumberValue);
};

const onIncButtonClick = () => {
  if (scaleNumberValue < Scale.MAX_VALUE) {
    scaleNumberValue += Scale.STEP;
  }
  setScaleValue(scaleNumberValue);
};

const onDecButtonClick = () => {
  if (scaleNumberValue > Scale.MIN_VALUE) {
    scaleNumberValue -= Scale.STEP;
  }
  setScaleValue(scaleNumberValue);
};

incButtonElement.addEventListener('click', onIncButtonClick);
decButtonElement.addEventListener('click', onDecButtonClick);

export { resetScaleValue };
