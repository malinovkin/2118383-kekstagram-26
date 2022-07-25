import {Thumbnails} from './thumbnails.js';
import {ImageViewer} from './image-viewer.js';
import {ImageEditor} from './image-editor.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const form = document.querySelector('#upload-select-image');
const uploadFileButton = document.querySelector('#upload-file');
const imageEditor = new ImageEditor(form);
const imageViewer = new ImageViewer();

getData((images) => {
  const thumbnails = new Thumbnails(imageViewer, images);
  thumbnails.draw(images);
}, showAlert);

uploadFileButton.addEventListener('change', () => {
  imageEditor.load(uploadFileButton.files[0]);
});
