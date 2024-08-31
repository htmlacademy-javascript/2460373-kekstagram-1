import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderGallery } from './gallery.js';
import { initializeUploadModal } from './upload-modal.js';
import { initializeFilters } from './filter.js';


getData()
  .then((photos) => {
    renderGallery(photos);
    initializeFilters(renderGallery, photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

initializeUploadModal();
