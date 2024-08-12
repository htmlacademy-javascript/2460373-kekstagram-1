import { generatePhotos } from './data.js';
import { initializeGallery } from './gallery.js';
import './form.js';

initializeGallery(generatePhotos());
