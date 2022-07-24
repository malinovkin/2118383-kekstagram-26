import {Thumbnails} from './thumbnails.js';
import {ImageEditor} from './image-editor.js';
import {createLoader} from './load.js';
import {showAlert} from './util.js';

const form = document.getElementById('upload-select-image');
form.inputHashtags = form.querySelector('input[name="hashtags"]');
form.textareaDescription = form.querySelector('textarea[name="description"]');
form.uploadFileButton = document.getElementById('upload-file');
form.imagePreview = form.querySelector('.img-upload__preview img');
form.uploadCancelButton = document.getElementById('upload-cancel');

const imageEditor = new ImageEditor(form);

createLoader((images) => {
  const thumbnails = new Thumbnails(form);
  thumbnails.draw(images);
}, showAlert);

form.uploadFileButton.addEventListener('change', () => {
  imageEditor.show(form.uploadFileButton);
});
