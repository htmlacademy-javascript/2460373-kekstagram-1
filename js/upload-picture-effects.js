import { imgPreviewElement } from './util.js';

const MAX_RANGE = 100;

const Effects = {
  chrome: {
    NAME: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT: ''
  },
  sepia: {
    NAME: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT: ''
  },
  marvin: {
    NAME: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    STEP: 1,
    UNIT: '%'
  },
  phobos: {
    NAME: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    STEP: 0.1,
    UNIT: 'px'
  },
  heat: {
    NAME: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    STEP: 0.1,
    UNIT: ''
  }
};

const effectsListElement = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const effectInputElement = document.querySelector('.effect-level__value');

let currentEffect = {};

const resetStyle = () => {
  imgPreviewElement.style.filter = '';
};

const resetEffects = () => {
  resetStyle();
  sliderWrapperElement.classList.add('visually-hidden');
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_RANGE
  },
  start: MAX_RANGE,
  connect: 'lower',
});

const updateSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.MIN_VALUE,
      max: effect.MAX_VALUE
    },
    start: effect.MAX_VALUE,
    step: effect.STEP,
  });
};

const setEffectValue = (effect, currentValue) => {
  effectInputElement.value = currentValue;
  imgPreviewElement.style.filter = `${effect.NAME}(${currentValue + effect.UNIT})`;
};

const initializeEffects = () => {
  effectsListElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.effects__radio')) {
      return;
    }
    resetStyle();
    sliderWrapperElement.classList.remove('visually-hidden');
    if (evt.target.id === 'effect-none') {
      sliderWrapperElement.classList.add('visually-hidden');
      effectInputElement.value = MAX_RANGE;
      return;
    }
    currentEffect = Effects[evt.target.value];
    updateSlider(currentEffect);
  });

  sliderElement.noUiSlider.on('update', () => {
    const currentValue = sliderElement.noUiSlider.get();
    setEffectValue(currentEffect, currentValue);
  });
};

export { initializeEffects, resetEffects };
