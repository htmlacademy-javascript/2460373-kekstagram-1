import { getRandomInteger, debounce } from './util.js';

const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const defaultFilterElement = filtersElement.querySelector('#filter-default');
const randomFilterElement = filtersElement.querySelector('#filter-random');
const discussedFilterElement = filtersElement.querySelector('#filter-discussed');

const comparePhotos = (photoA, photoB) =>
  photoB.comments.length - photoA.comments.length;

let activeFilter = defaultFilterElement;

const toggleActiveFilter = (newFilter) => {
  activeFilter.classList.remove('img-filters__button--active');
  activeFilter = newFilter;
  activeFilter.classList.add('img-filters__button--active');
};

const initializeFilters = (callback, originalPhotos) => {

  filtersElement.classList.remove('img-filters--inactive');

  let newPhotos;

  const debouncedRender = debounce(() => {
    callback(newPhotos);
  }, RERENDER_DELAY);

  defaultFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      newPhotos = originalPhotos;
      toggleActiveFilter(evt.target);
      debouncedRender(newPhotos);
    }
  });

  randomFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      newPhotos = originalPhotos
        .slice()
        .sort(() => getRandomInteger(-1, 1))
        .slice(0, 10);
      debouncedRender(newPhotos);
    }
  });

  discussedFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      newPhotos = originalPhotos
        .slice()
        .sort(comparePhotos);
      debouncedRender(newPhotos);
    }
  });
};

export { initializeFilters };
