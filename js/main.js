import { generatePhotos } from './data.js';
import { initializeGallery } from './gallery.js';
import { initializeFormValidation } from './upload-form-validation.js';
import { initializeUploadModal } from './upload-modal.js';
import './upload-picture-edit.js';

initializeGallery(generatePhotos());
initializeFormValidation();
initializeUploadModal();
