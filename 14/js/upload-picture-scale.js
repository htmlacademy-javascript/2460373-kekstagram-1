import { imgPreviewElement } from './util.js';

const Scale = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100,
};

const scaleContainer = document.querySelector('.img-upload__scale');
const incButton = scaleContainer.querySelector('.scale__control--bigger');
const decButton = scaleContainer.querySelector('.scale__control--smaller');
const scaleInput = scaleContainer.querySelector('.scale__control--value');
let scaleNumberValue = Scale.DEFAULT_VALUE;

const setScaleValue = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
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

incButton.addEventListener('click', onIncButtonClick);
decButton.addEventListener('click', onDecButtonClick);

export { resetScaleValue };
