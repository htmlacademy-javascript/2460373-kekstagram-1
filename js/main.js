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

const PHOTOS_INFO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdGeneratorFromRange(min, max) {
  const previousValues = [];

  return function () {
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
}

function chooseCommentText() {

  const commentsAmount = getRandomInteger(0, 1);
  let commentText = getRandomArrayElement(COMMENT_TEXTS);

  if (commentsAmount === 0) {
    return commentText;
  }

  let commentSecondText = getRandomArrayElement(COMMENT_TEXTS);
  while (commentSecondText === commentText) {
    commentSecondText = getRandomArrayElement(COMMENT_TEXTS);
  }

  commentText = `${commentText}\n${commentSecondText}`;

  return commentText;
}

const generatePhotoId = createRandomIdGeneratorFromRange(1, PHOTOS_INFO_COUNT);
const generateCommentId = createRandomIdGeneratorFromRange(1, 1000);

const createComment = () => ({
  // У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
  id: generateCommentId(),
  // Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  // Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных.
  message: `${chooseCommentText()}`,
  // Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
  name: `${getRandomArrayElement(NAMES)}`,
});

const createPhotoInfo = () => ({
  // id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
  id: generatePhotoId(),
  // url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  url: `photos/${this.id}.jpg`,
  // description, строка — описание фотографии. Описание придумайте самостоятельно.
  description: 'Красивое описание красивой картинки',
  // likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  likes: getRandomInteger(15, 200),
  // comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
  comments: Array.from({ length: getRandomInteger(1, 10) }, createComment),
});

const photosInfo = Array.from({ length: PHOTOS_INFO_COUNT }, createPhotoInfo);

for (let i = 0; i < photosInfo.length; i++) {
  const photoId = photosInfo[i].id;
  photosInfo[i].url = `photos/${photoId}.jpg`;
}

console.log (photosInfo);
