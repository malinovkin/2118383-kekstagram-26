import {generateData} from './generate-data.js';

generateData();

class ImageEditor {
  constructor() {
    this.setScale(100);
    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.close();
      }
    });
    document.getElementById('upload-cancel').addEventListener('click', () => { this.close(); }, false);
    document.querySelector('.scale__control--smaller').addEventListener('click',
      () => { this.setScale(this.scale - 25); }, false);
    document.querySelector('.scale__control--bigger').addEventListener('click',
      () => { this.setScale(this.scale + 25); }, false);
  }

  // закрытие редактора
  close() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // открытие редактора
  show(image) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.querySelector('.img-upload__preview img').src = e.target.result;
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      document.body.classList.add('modal-open');
    };
    if(image.files[0]) {
      // загрузка изображения
      reader.readAsDataURL(image.files[0]);
    }
    this.setScale(100);
  }

  // установка масштаба изображения
  setScale(scale) {
    if (scale < 0) {
      this.scale = 0;
    } else if (scale > 100) {
      this.scale = 100;
    } else {
      this.scale = scale;
    }
    document.querySelector('input[name=scale]').value = `${this.scale}%`;
    document.querySelector('.img-upload__preview img').style.transform = `scale(${this.scale/100})`;
  }

  // установка эффекта на изображение
  setEffect(effectName, effecIntensity) {

  }
}

const uploadFileButton = document.getElementById('upload-file');
const imageEditor = new ImageEditor();

uploadFileButton.addEventListener('change', () => {
  imageEditor.show(uploadFileButton);
}, false);
