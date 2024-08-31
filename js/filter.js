import { initializeGallery } from './gallery.js';
import { getRandomInteger } from './util.js';

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

const initializeFilters = (originalPhotos) => {

  filtersElement.classList.remove('img-filters--inactive');

  defaultFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      initializeGallery(originalPhotos);
    }
  });

  randomFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      const randomPhotos = originalPhotos
        .slice()
        .sort(() => getRandomInteger(-1, 1))
        .slice(0, 10);
      initializeGallery(randomPhotos);
    }
  });

  discussedFilterElement.addEventListener('click', (evt) => {
    if (evt.target !== activeFilter) {
      toggleActiveFilter(evt.target);
      const discussedPhotos = originalPhotos
        .slice()
        .sort(comparePhotos);
      initializeGallery(discussedPhotos);
    }
  });
};

export { initializeFilters };
