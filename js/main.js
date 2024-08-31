import { getData } from './api.js';
import { showAlert } from './util.js';
import { initializeGallery } from './gallery.js';
import { initializeUploadModal } from './upload-modal.js';
import { initializeFilters } from './filter.js';

// debugger;
getData()
  .then((photos) => {
    initializeGallery(photos);
    initializeFilters(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

initializeUploadModal();
