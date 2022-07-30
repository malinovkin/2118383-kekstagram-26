import {isEscapeKey} from './util.js';
import {ValidateForm} from './validate-form.js';
import {sendData} from './api.js';
import {MesssageDialog} from './messsage-dialog.js';

class ImageEditor {
  constructor(form) {
    // поддерживаемые расширения загружаемых файлов
    this.FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
    this.submitButton = document.querySelector('#upload-submit');
    this.sliderElement = document.querySelector('.effect-level__slider');
    this.sliderElementValue = document.querySelector('.effect-level__value');
    this.setOptionsToDefault();
  }

  // максимальный масштаб
  static get MAX_SCALE() {
    return 100;
  }

  // минимальный масштаб
  static get MIN_SCALE() {
    return 25;
  }

  // шаг изменения масштаба
  static get STEP_SCALE() {
    return 25;
  }

  // настройки слайдера для эффектов
  static getNouisliderOptions(effectName) {
    let result;
    switch (effectName) {
      case 'chrome':
        result = {range: {min: 0, max: 1}, start: 1, step: 0.1, cssTemplate: 'grayscale(%s)'};
        break;
      case 'sepia':
        result = {range: {min: 0, max: 1}, start: 1, step: 0.1, cssTemplate: 'sepia(%s)'};
        break;
      case 'marvin':
        result = {range: {min: 0, max: 100}, start: 100, step: 1, cssTemplate: 'invert(%s%)'};
        break;
      case 'phobos':
        result = {range: {min: 0, max: 3}, start: 3, step: 0.1, cssTemplate: 'blur(%spx)'};
        break;
      case 'heat':
        result = {range: {min: 1, max: 3}, start: 3, step: 0.1, cssTemplate: 'brightness(%s)'};
        break;
    }
    return result;
  }

  // сброс формы в исходное состояние
  setOptionsToDefault() {
    this.setScale(ImageEditor.MAX_SCALE);
    this.setEffect('none');
    this.form.reset();
  }

  // обработчик нажатия на крестик
  buttonCloseListener() {
    this.close();
    this.setOptionsToDefault();
  }

  // обработчик редактирования масштаба изображения
  buttonScaleUpDownListener(step) {
    this.setScale(this.scale + step);
  }

  // обработчик нажатия на кнопку клавиатуры
  keydownListener(evt) {
    // если фокус находится в поле хэш-тегов или комментария редактор не закрываем
    if (isEscapeKey(evt) && (this.inputHashtags !== document.activeElement) &&
      (this.textareaDescription !== document.activeElement)) {
      this.close();
      this.setOptionsToDefault();
    }
  }

  // обработчик события смены эффектов
  effectsChangeListener(evt) {
    if (evt.target.getAttribute('name') === 'effect') {
      this.setEffect(evt.target.getAttribute('value'));
    }
  }

  // установка состояния кнопки отправки
  setSubmitButtonState(state) {
    this.submitButton.disabled = !state;
    this.submitButton.textContent = (state) ? 'Опубликовать' : 'Отправка...';
  }

  // обработчик отправки формы
  formSubmitListener(evt) {
    evt.preventDefault();
    if (ValidateForm.validateTags(this.inputHashtags) &&
      (ValidateForm.validateComment(this.textareaDescription))) {
      this.setSubmitButtonState(false);
      sendData(
        () => {
          this.setSubmitButtonState(true);
          new MesssageDialog('success').show();
          this.close();
          this.setOptionsToDefault();
        },
        () => {
          this.close();
          new MesssageDialog('error', () => this.show()).show();
          this.setSubmitButtonState(true);
        },
        new FormData(evt.target)
      );
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
    this.inputHashtags.removeEventListener('input', this.inputCheckListenerRef);
    this.textareaDescription.removeEventListener('input', this.inputCheckListenerRef);
  }

  // загрузка изображения в редактор
  load(imageFile) {
    const fileName = imageFile.name.toLowerCase();
    if (this.FILE_TYPES.some((it) => fileName.endsWith(it))) {
      this.imagePreview.src = URL.createObjectURL(imageFile);
      this.show();
    }
  }

  // открытие редактора
  show() {
    const imageEditor = this;
    this.buttonCloseListenerRef = () => imageEditor.buttonCloseListener();
    this.uploadCancelButton.addEventListener('click', this.buttonCloseListenerRef);
    this.buttonScaleUpListenerRef = () => imageEditor.buttonScaleUpDownListener(ImageEditor.STEP_SCALE);
    this.buttonScaleUp.addEventListener('click', this.buttonScaleUpListenerRef);
    this.buttonScaleDownListenerRef = () => imageEditor.buttonScaleUpDownListener(-ImageEditor.STEP_SCALE);
    this.buttonScaleDown.addEventListener('click', this.buttonScaleDownListenerRef);
    this.keydownListenerRef = (evt) => imageEditor.keydownListener(evt);
    document.addEventListener('keydown', this.keydownListenerRef);
    this.effectsChangeListenerRef = (evt) => imageEditor.effectsChangeListener(evt);
    this.effectsList.addEventListener('change', this.effectsChangeListenerRef);
    this.formSubmitListenerRef = (evt) => imageEditor.formSubmitListener(evt);
    this.form.addEventListener('submit', this.formSubmitListenerRef);
    this.inputCheckListenerRef = (evt) => imageEditor.inputCheckListener(evt);
    this.inputHashtags.addEventListener('input', this.inputCheckListenerRef);
    this.textareaDescription.addEventListener('input', this.inputCheckListenerRef);
    imageEditor.uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  // установка масштаба изображения
  setScale(scale) {
    if (scale < ImageEditor.MIN_SCALE) {
      this.scale = ImageEditor.MIN_SCALE;
    } else if (scale > ImageEditor.MAX_SCALE) {
      this.scale = ImageEditor.MAX_SCALE;
    } else {
      this.scale = scale;
    }
    this.inputScale.setAttribute('value', `${this.scale}%`);
    this.imagePreview.style.transform = `scale(${this.scale/100})`;
  }

  // обновление слайдера
  updateNouislider(effectName) {
    const options = ImageEditor.getNouisliderOptions(effectName);
    this.cssTemplate = options.cssTemplate;
    if (this.sliderElement.noUiSlider === undefined) {
      options.connect = 'lower';
      options.format = {
        to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
        from: (value) => parseFloat(value)
      };
      noUiSlider.create(this.sliderElement, options);
      const imageEditor = this;
      this.sliderElement.noUiSlider.on('update', () => {
        imageEditor.sliderElementValue.value = imageEditor.sliderElement.noUiSlider.get();
        imageEditor.imagePreview.style.filter = imageEditor.cssTemplate.replace('%s',
          imageEditor.sliderElementValue.value);
      });
      this.sliderElement.parentNode.classList.remove('hidden');
    } else {
      this.sliderElement.noUiSlider.updateOptions(options);
    }
  }

  // скрытие слайдера
  destroyNouislider() {
    if (this.sliderElement.noUiSlider !== undefined) {
      this.sliderElement.noUiSlider.destroy();
      this.sliderElement.parentNode.classList.add('hidden');
      this.imagePreview.style.filter = '';
      this.sliderElementValue.value = '';
    }
  }

  // установка эффекта на изображение
  setEffect(effectName) {
    this.imagePreview.setAttribute('class', '');
    if (effectName !== 'none') {
      this.imagePreview.classList.add(`effects__preview--${effectName}`);
      this.updateNouislider(effectName);
    } else {
      this.destroyNouislider();
    }
  }
}

export {ImageEditor};
