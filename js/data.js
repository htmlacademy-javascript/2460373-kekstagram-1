import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Артём',
  'Степан',
];

const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_AMOUNT = 25;

const createRandomIdGeneratorFromRange = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getCommentMessage = () => {

  const commentText = getRandomArrayElement(COMMENT_TEXTS);

  if (Math.random() < 0.5) {
    let commentSecondText = getRandomArrayElement(COMMENT_TEXTS);

    while (commentSecondText === commentText) {
      commentSecondText = getRandomArrayElement(COMMENT_TEXTS);
    }
    return `${commentText}\n${commentSecondText}`;
  }
  return commentText;
};

const generateCommentId = createRandomIdGeneratorFromRange(1, 1000);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoInfo = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Красивое описание красивой картинки',
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(1, 10) }, createComment),
});

const generatePhotos = () => Array.from({ length: PHOTO_AMOUNT }, (element, index) => createPhotoInfo(index + 1));

export {generatePhotos};
