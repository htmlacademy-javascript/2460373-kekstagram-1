const Scale = {
  STEP: 25,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100,
};

const incrScaleButton = document.querySelector('.scale__control--bigger');
const decrScaleButton = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview');
let scaleNumberValue = Scale.DEFAULT_VALUE;

const resetScaleValue = () => {
  scaleNumberValue = Scale.DEFAULT_VALUE;
  imgPreviewElement.style.transform = `scale(${scaleNumberValue / 100})`;
};

const updateScale = (isIncreased) => {
  if (isIncreased && scaleNumberValue < Scale.MAX_VALUE) {
    scaleNumberValue += Scale.STEP;
  } else if (!isIncreased && scaleNumberValue > Scale.MIN_VALUE) {
    scaleNumberValue -= Scale.STEP;
  }
  imgPreviewElement.style.transform = `scale(${scaleNumberValue / 100})`;
};

const onScaleButtonClick = (evt) => {
  const isIncreased = evt.target === incrScaleButton;
  updateScale(isIncreased);

  scaleInput.value = `${scaleNumberValue}%`;
};

incrScaleButton.addEventListener('click', onScaleButtonClick);
decrScaleButton.addEventListener('click', onScaleButtonClick);

export { resetScaleValue };
