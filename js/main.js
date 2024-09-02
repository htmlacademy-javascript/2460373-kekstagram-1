import { getData } from './api.js';
import { showAlert } from './util.js';
import { initializeGallery } from './gallery.js';
import { initializeUploadModal } from './upload-modal.js';
import { initializeFilters } from './filter.js';
import { renderThumbnails } from './thumbnails.js';

getData()
  .then((photos) => {
    initializeGallery(photos);
    initializeFilters(renderThumbnails, photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

initializeUploadModal();
