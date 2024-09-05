import { uploadFormElement, hashtagFieldElement } from './util.js';

const Hashtag = {
  MAX_QTY: 5,
  MAX_LENGTH: 20
};

const pristine = new Pristine(uploadFormElement, {
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

pristine.addValidator(hashtagFieldElement, validateHashtagFormat, 'Неправильный формат хеш-тега', 2, true);
pristine.addValidator(hashtagFieldElement, validateHashtagQty, `Нельзя указать больше ${Hashtag.MAX_QTY} хэш-тегов`, 1, true);
pristine.addValidator(hashtagFieldElement, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды', 3, true);

export { pristine };
