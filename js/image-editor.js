import {isEscapeKey} from './util.js';
import {ValidateForm} from './validate-form.js';
import {sendData} from './api.js';

class ImageEditor {
  constructor(form) {
    this.form = form;
    this.inputScale = document.querySelector('input[name=scale]');
    this.uploadOverlay = document.querySelector('.img-upload__overlay');
    this.buttonScaleUp = document.querySelector('.scale__control--bigger');
    this.buttonScaleDown = document.querySelector('.scale__control--smaller');
    this.effectsList = document.querySelector('.effects__list');
    this.inputHashtags = document.querySelector('input[name="hashtags"]');
    this.textareaDescription = document.querySelector('textarea[name="description"]');
    this.imagePreview = document.querySelector('.img-upload__preview img');
    this.uploadCancelButton = document.querySelector('#upload-cancel');
  }

  // обработчик нажатия на крестик
  buttonCloseListener() {
    this.close();
  }

  // обработчик редактирования масштаба
  buttonScaleUpDownListener(step) {
    this.setScale(this.scale + step);
  }

  // обработчик нажатия на кнопку клавиатуры
  keydownListener(evt) {
    // если фокус находится в поле хэш-тегов или комментария редактор не закрываем
    if (isEscapeKey(evt) && (this.inputHashtags !== document.activeElement) &&
      (this.textareaDescription !== document.activeElement)) {
      this.close();
    }
  }

  // обработчик события смены эффектов
  effectsChangeListener(evt) {
    if (evt.target.getAttribute('name') === 'effect') {
      this.setEffect(evt.target.getAttribute('value'));
    }
  }

  // обработчик отправки формы
  formSubmitListener(evt) {
    if (!ValidateForm.execute(this.form)) {
      evt.preventDefault();
    }
  }

  // обработчик проверки полей формы
  inputCheckListener(evt) {
    if (((evt.target === this.inputHashtags) && ValidateForm.validateTags(evt.target)) ||
      ((evt.target === this.textareaDescription) && ValidateForm.validateComment(evt.target))) {
      evt.target.setCustomValidity('');
    } else {
      evt.target.setCustomValidity('Поле заполнено некорректно!');
    }
  }

  // закрытие редактора
  close() {
    this.uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.uploadCancelButton.removeEventListener('click', this.buttonCloseListenerRef);
    this.buttonScaleUp.removeEventListener('click', this.buttonScaleUpListenerRef);
    this.buttonScaleDown.removeEventListener('click', this.buttonScaleDownListenerRef);
    document.removeEventListener('keydown', this.keydownListenerRef);
    this.effectsList.removeEventListener('change', this.effectsChangeListenerRef);
    this.form.removeEventListener('submit', this.formSubmitListenerRef);
    this.inputHashtags.removeEventListener('input', this.inputHashtagsInputListenerRef);
    this.textareaDescription.removeEventListener('input', this.textareaDescriptionInputListenerRef);
    this.form.reset();
  }

  // открытие редактора
  show(image) {
    const reader = new FileReader();
    const imagePreview = this.imagePreview;
    const imageEditor = this;
    reader.onload = function(evt) {
      imagePreview.src = evt.target.result;
      imageEditor.uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    };
    if(image.files[0]) {
      // загрузка изображения
      reader.readAsDataURL(image.files[0]);
    }
    this.setScale(100);
    this.setEffect('none');
    this.uploadCancelButton.addEventListener('click', this.buttonCloseListenerRef = function() {
      imageEditor.buttonCloseListener();
    });
    this.buttonScaleUp.addEventListener('click', this.buttonScaleUpListenerRef = function() {
      imageEditor.buttonScaleUpDownListener(25);
    });
    this.buttonScaleDown.addEventListener('click', this.buttonScaleDownListenerRef = function() {
      imageEditor.buttonScaleUpDownListener(-25);
    });
    document.addEventListener('keydown', this.keydownListenerRef = function(evt) {
      imageEditor.keydownListener(evt);
    });
    this.effectsList.addEventListener('change', this.effectsChangeListenerRef = function(evt) {
      imageEditor.effectsChangeListener(evt);
    });
    this.form.addEventListener('submit', this.formSubmitListenerRef = function(evt) {
      imageEditor.formSubmitListener(evt);
    });
    this.inputHashtags.addEventListener('input', this.inputHashtagsInputListenerRef = function(evt) {
      imageEditor.inputCheckListener(evt);
    });
    this.textareaDescription.addEventListener('input', this.textareaDescriptionRef = function(evt) {
      imageEditor.inputCheckListener(evt);
    });
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
    this.inputScale.setAttribute('value', `${this.scale}%`);
    this.imagePreview.style.transform = `scale(${this.scale/100})`;
  }

  // установка эффекта на изображение
  setEffect(effectName) {
    this.imagePreview.setAttribute('class', '');
    if (effectName !== 'none') {
      this.imagePreview.classList.add(`effects__preview--${effectName}`);
    }
  }
}

export {ImageEditor};
