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

const effectsList = document.querySelector('.effects__list');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectInput = document.querySelector('.effect-level__value');

let currentEffect = {};

const resetStyle = () => {
  imgPreviewElement.style.filter = '';
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  connect: 'lower',
  format: {
    // по критерию Д5 нужно объявлять методы сокращённой записью, но сюда это не распространяется?
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.MIN_VALUE,
      max: effect.MAX_VALUE
    },
    start: effect.MAX_VALUE,
    step: effect.STEP,
    format: {
      to: function (value) {
        // debugger;
        if (effect.NAME === 'invert') {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const updateEffectInput = (effect, currentValue) => {
  effectInput.value = currentValue;
};

const updateStyle = (effect, currentValue) => {
  imgPreviewElement.style.filter = `${effect.NAME}(${currentValue + effect.UNIT})`;
};

const updateEffect = (effect, currentValue = effect.MAX_VALUE) => {
  // debugger;
  updateSlider(effect, currentValue);
  updateEffectInput(effect, currentValue);
  updateStyle(effect, currentValue);
};

const initializeEffects = () => {
  effectsList.addEventListener('click', (evt) => {
    resetStyle();
    sliderWrapper.classList.remove('visually-hidden');
    switch (evt.target.id) {
      case 'effect-none':
        sliderWrapper.classList.add('visually-hidden');
        break;
      case 'effect-chrome':
        currentEffect = Effects['chrome'];
        updateEffect(currentEffect);
        break;
      case 'effect-sepia':
        currentEffect = Effects['sepia'];
        updateEffect(currentEffect);
        break;
      case 'effect-marvin':
        currentEffect = Effects['marvin'];
        updateEffect(currentEffect);
        break;
      case 'effect-phobos':
        currentEffect = Effects['phobos'];
        updateEffect(currentEffect);
        break;
      case 'effect-heat':
        currentEffect = Effects['heat'];
        updateEffect(currentEffect);
    }

  });

  sliderElement.noUiSlider.on('update', () => {
    const currentValue = sliderElement.noUiSlider.get();
    updateEffectInput(currentEffect, currentValue);
    updateStyle(currentEffect, currentValue);
  });
};

export { initializeEffects };
