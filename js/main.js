import {generateData} from './generate-data.js';
import {drawThumbnails} from './draw-thumbnails.js';
import {ImageEditor} from './image-editor.js';

drawThumbnails(generateData());

const form = document.getElementById('upload-select-image');
form.inputHashtags = form.querySelector('input[name="hashtags"]');
form.textareaDescription = form.querySelector('textarea[name="description"]');
form.uploadFileButton = document.getElementById('upload-file');
form.imagePreview = form.querySelector('.img-upload__preview img');
form.uploadCancelButton = document.getElementById('upload-cancel');

const imageEditor = new ImageEditor(form);

form.uploadFileButton.addEventListener('change', () => {
  imageEditor.show(form.uploadFileButton);
});
