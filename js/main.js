import { generatePhotos } from './data.js';
import { initializeGallery } from './gallery.js';
import { initializeFormValidation } from './upload-form-validation.js';
import { initializeUploadModal } from './upload-modal.js';
import { initializeEffects } from './upload-picture-effects.js';

initializeGallery(generatePhotos());
initializeFormValidation();
initializeUploadModal();
initializeEffects();
