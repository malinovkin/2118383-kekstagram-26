import {Thumbnails} from './thumbnails.js';
import {ImageViewer} from './image-viewer.js';
import {ImageEditor} from './image-editor.js';
import {createLoader} from './load.js';
import {showAlert} from './util.js';

const form = document.querySelector('#upload-select-image');
form.inputHashtags = form.querySelector('input[name="hashtags"]');
form.textareaDescription = form.querySelector('textarea[name="description"]');
form.uploadFileButton = document.querySelector('#upload-file');
form.imagePreview = form.querySelector('.img-upload__preview img');
form.uploadCancelButton = document.querySelector('#upload-cancel');

const imageEditor = new ImageEditor(form);
const imageViewer = new ImageViewer();
const thumbnails = new Thumbnails(imageViewer);

createLoader((images) => {
  thumbnails.draw(images);
}, showAlert);

form.uploadFileButton.addEventListener('change', () => {
  imageEditor.show(form.uploadFileButton);
});
