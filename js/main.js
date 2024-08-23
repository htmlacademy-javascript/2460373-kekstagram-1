import { generatePhotos } from './data.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initializeGallery } from './gallery.js';
import { initializeUploadModal } from './upload-modal.js';

// debugger;
getData()
  .then((photos) => {
    initializeGallery(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

initializeUploadModal();
