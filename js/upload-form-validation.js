import { uploadForm, hashtagField } from './util.js';

const Hashtag = {
  MAX_QTY: 5,
  MAX_LENGTH: 20
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const getHashtagsFromString = (string) => string.toLowerCase().trim().split(' ').filter((hashtag) => hashtag);

const validateHashtagFormat = (string) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  const hashtags = getHashtagsFromString(string);

  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

const validateHashtagQty = (string) => {
  const hashtags = getHashtagsFromString(string);

  return hashtags.length <= Hashtag.MAX_QTY;
};

const validateHashtagUnique = (string) => {
  const hashtags = getHashtagsFromString(string);

  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(hashtagField, validateHashtagFormat, 'Неправильный формат хеш-тега', 2, true);
pristine.addValidator(hashtagField, validateHashtagQty, `Нельзя указать больше ${Hashtag.MAX_QTY} хэш-тегов`, 1, true);
pristine.addValidator(hashtagField, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды', 3, true);

const initializeFormValidation = () => {
  uploadForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export { initializeFormValidation };
