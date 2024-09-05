import { getRandomInteger, debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTO_MAX = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const defaultFilterElement = filtersElement.querySelector('#filter-default');

const comparePhotos = (photoA, photoB) =>
  photoB.comments.length - photoA.comments.length;

let activeFilter = defaultFilterElement;

const toggleActiveFilter = (newFilter) => {
  activeFilter.classList.remove('img-filters__button--active');
  activeFilter = newFilter;
  activeFilter.classList.add('img-filters__button--active');
};

const getFilteredPhotos = (filter, photos) => {
  switch (filter.id) {
    case Filter.DEFAULT:
      return photos;
    case Filter.RANDOM:
      return [...photos]
        .sort(() => getRandomInteger(-1, 1))
        .slice(0, RANDOM_PHOTO_MAX);
    case Filter.DISCUSSED:
      return [...photos]
        .sort(comparePhotos);
    default:
      return photos;

  }
};

const initializeFilters = (callback, originalPhotos) => {

  filtersElement.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((photos) => {
    callback(photos);
  }, RERENDER_DELAY);

  filtersElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      const photos = getFilteredPhotos(evt.target, originalPhotos);
      debouncedRender(photos);
    }
  });
};

export { initializeFilters };
