class ImageEditor {
  constructor() {
    this.form = document.getElementById('upload-select-image');
    this.imagePreview = document.querySelector('.img-upload__preview img');
    document.body.addEventListener('keydown', (e) => {
      // если фокус находится в поле хэш-тегов или комментария редактор не закрываем
      if ((e.code === 'Escape') &&
        (this.form.querySelector('input[name="hashtags"]') !== document.activeElement) &&
        (this.form.querySelector('textarea[name="description"]') !== document.activeElement)) {
        this.close();
      }
    });
    document.getElementById('upload-cancel').addEventListener('click', () => { this.close(); }, false);
    document.querySelector('.scale__control--smaller').addEventListener('click',
      () => { this.setScale(this.scale - 25); }, false);
    document.querySelector('.scale__control--bigger').addEventListener('click',
      () => { this.setScale(this.scale + 25); }, false);
    // переключение эффектов
    const radios = this.form.effect;
    radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        this.setEffect(radio.getAttribute('value'));
      });
    });
  }

  // закрытие редактора
  close() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.form.reset();
  }

  // открытие редактора
  show(image) {
    const reader = new FileReader();
    const imagePreview = this.imagePreview;
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      document.body.classList.add('modal-open');
    };
    if(image.files[0]) {
      // загрузка изображения
      reader.readAsDataURL(image.files[0]);
    }
    this.setScale(100);
    this.setEffect('none');
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
    this.imagePreview.style.transform = `scale(${this.scale/100})`;
  }

  // установка эффекта на изображение
  setEffect(effectName) {
    this.imagePreview.className = '';
    if (effectName !== 'none') {
      this.imagePreview.classList.add(`effects__preview--${effectName}`);
    }
  }
}

export {ImageEditor};
