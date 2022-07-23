import {isEscapeKey} from './util.js';
import {ValidateForm} from './validate-form.js';

class ImageEditor {
  constructor(form) {
    this.form = form;
    this.inputScale = form.querySelector('input[name=scale]');
    this.uploadOverlay = document.querySelector('.img-upload__overlay');
    this.buttonScaleUp = document.querySelector('.scale__control--bigger');
    this.buttonScaleDown = document.querySelector('.scale__control--smaller');
    this.effectsList = form.querySelector('.effects__list');
  }

  // закрытие редактора
  close() {
    this.uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.form.uploadCancelButton.removeEventListener('click', this.buttonCloseListener);
    this.buttonScaleUp.removeEventListener('click', this.buttonScaleUpListener);
    this.buttonScaleDown.removeEventListener('click', this.buttonScaleDownListener);
    document.body.removeEventListener('keydown', this.bodyKeydownListener);
    this.effectsList.removeEventListener('change', this.effectsChangeListener);
    this.form.removeEventListener('submit', this.formSubmitListener);
    this.form.inputHashtags.removeEventListener('input', this.inputHashtagsInputListener);
    this.form.textareaDescription.removeEventListener('input', this.textareaDescriptionInputListener);
    this.form.reset();
  }

  // открытие редактора
  show(image) {
    const reader = new FileReader();
    const imagePreview = this.form.imagePreview;
    const imageEditor = this;
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imageEditor.uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    };
    if(image.files[0]) {
      // загрузка изображения
      reader.readAsDataURL(image.files[0]);
    }
    this.setScale(100);
    this.setEffect('none');
    this.buttonCloseListener = function() { imageEditor.close(); };
    this.form.uploadCancelButton.addEventListener('click', this.buttonCloseListener);
    this.buttonScaleUpListener = function() { imageEditor.setScale(imageEditor.scale + 25); };
    this.buttonScaleUp.addEventListener('click', this.buttonScaleUpListener);
    this.buttonScaleDownListener = function() { imageEditor.setScale(imageEditor.scale - 25); };
    this.buttonScaleDown.addEventListener('click', this.buttonScaleDownListener);
    this.bodyKeydownListener = function(e) {
      // если фокус находится в поле хэш-тегов или комментария редактор не закрываем
      if (isEscapeKey(e) && (imageEditor.form.inputHashtags !== document.activeElement) &&
        (imageEditor.form.textareaDescription !== document.activeElement)) {
        imageEditor.close();
      }
    };
    document.body.addEventListener('keydown', this.bodyKeydownListener);
    // событие смены эффектов
    this.effectsChangeListener = function(e) {
      if (e.target.getAttribute('name') === 'effect') {
        imageEditor.setEffect(e.target.getAttribute('value'));
      }
    };
    this.effectsList.addEventListener('change', this.effectsChangeListener);
    // событие отправки формы
    this.formSubmitListener = function(e) {
      if (!ValidateForm.execute(imageEditor.form)) {
        e.preventDefault();
      }
    };
    this.form.addEventListener('submit', this.formSubmitListener);
    // проверка хэш-тегов
    this.inputHashtagsInputListener = function(e) {
      if (!ValidateForm.validateTags(e.target)) {
        e.target.setCustomValidity('Поле заполнено некорректно!');
      } else {
        e.target.setCustomValidity('');
      }
    };
    this.form.inputHashtags.addEventListener('input', this.inputHashtagsInputListener);
    // проверка комментария
    this.textareaDescriptionInputListener = function(e) {
      if (!ValidateForm.validateComment(e.target)) {
        e.target.setCustomValidity('Поле заполнено некорректно!');
      } else {
        e.target.setCustomValidity('');
      }
    };
    this.form.textareaDescription.addEventListener('input', this.textareaDescriptionInputListener);
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
    this.inputScale.value = `${this.scale}%`;
    this.form.imagePreview.style.transform = `scale(${this.scale/100})`;
  }

  // установка эффекта на изображение
  setEffect(effectName) {
    this.form.imagePreview.className = '';
    if (effectName !== 'none') {
      this.form.imagePreview.classList.add(`effects__preview--${effectName}`);
    }
  }
}

export {ImageEditor};
