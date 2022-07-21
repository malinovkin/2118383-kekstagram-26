import {generateData} from './generate-data.js';

generateData();

const fileReader = new FileReader();
const uploadFileButton = document.getElementById('upload-file');

// функция выборки файла
function loadImageFile() {
  const file = uploadFileButton.files[0];
  if (file) {
    fileReader.readAsDataURL(file);
  }
}

// функция закрытия редактора
function closeEditor() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

document.getElementById('upload-cancel').addEventListener('click', closeEditor);
document.body.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeEditor();
  }
});

uploadFileButton.addEventListener('change', loadImageFile, false);

fileReader.onload = function(e) {
  document.querySelector('.img-upload__preview img').src = e.target.result;
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
};
