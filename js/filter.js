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

  const getFilteredPhotos = (filter) => {
    let filteredPhotos;
    switch (filter) {
      case defaultFilterElement:
        filteredPhotos = originalPhotos;
        return filteredPhotos;

      case randomFilterElement:
        filteredPhotos = originalPhotos
          .slice()
          .sort(() => getRandomInteger(-1, 1))
          .slice(0, 10);
        return filteredPhotos;

      case discussedFilterElement:
        filteredPhotos = originalPhotos
          .slice()
          .sort(comparePhotos);
        return filteredPhotos;
    }
  };

  const debouncedRender = debounce((photos) => {
    callback(photos);
  }, RERENDER_DELAY);

  filtersElement.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'BUTTON' && evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      const photos = getFilteredPhotos(evt.target);
      debouncedRender(photos);
    }
  });
};

export { initializeFilters };
