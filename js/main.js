import {Thumbnails} from './thumbnails.js';
import {ImageViewer} from './image-viewer.js';
import {ImageEditor} from './image-editor.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const form = document.querySelector('#upload-select-image');
form.uploadFileButton = document.querySelector('#upload-file');

const imageEditor = new ImageEditor(form);
const imageViewer = new ImageViewer();
const thumbnails = new Thumbnails(imageViewer);

getData((images) => {
  thumbnails.draw(images);
}, showAlert);

form.uploadFileButton.addEventListener('change', () => {
  imageEditor.show(form.uploadFileButton);
});
