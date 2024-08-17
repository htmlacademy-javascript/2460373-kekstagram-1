import { generatePhotos } from './data.js';
import { initializeGallery } from './gallery.js';
import { initializeUploadModal } from './upload-modal.js';

initializeGallery(generatePhotos());
initializeUploadModal();
