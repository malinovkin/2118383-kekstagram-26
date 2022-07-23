import {generateData} from './generate-data.js';
import {drawThumbnails} from './draw-thumbnails.js';
import {ImageEditor} from './image-editor.js';
import {ValidateForm} from './validate-form.js';

drawThumbnails(generateData());

const uploadFileButton = document.getElementById('upload-file');
const form = document.getElementById('upload-select-image');
const imageEditor = new ImageEditor();

uploadFileButton.addEventListener('change', () => {
  imageEditor.show(uploadFileButton);
}, false);

form.querySelector('input[name="hashtags"]').addEventListener('input', (e) => {
  if (!ValidateForm.validateTags(e.currentTarget)) {
    e.target.setCustomValidity('Поле заполнено некорректно!');
  } else {
    e.target.setCustomValidity('');
  }
});

form.querySelector('textarea[name="description"]').addEventListener('input', (e) => {
  if (!ValidateForm.validateComment(e.currentTarget)) {
    e.target.setCustomValidity('Поле заполнено некорректно!');
  } else {
    e.target.setCustomValidity('');
  }
});

form.addEventListener('submit', (e) => {
  if (!ValidateForm.execute(form)) {
    e.preventDefault();
  }
});
