const ALERT_SHOW_TIME = 5000;

// Функция возвращает случайное целое число из переданного диапазона включительно.
// Если входные данные не корректны, то функция возвращает -1
const getRandomInteger = (minValue, maxValue) => ((minValue >= 0) && (minValue < maxValue)) ?
  Math.floor(minValue + Math.random() * (maxValue - minValue + 1)) : -1;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

class MesssageDialog {
  constructor(messageType, formShowCallback) {
    this.messageType = messageType;
    this.formShowCallback = formShowCallback;
  }

  // обработчик нажатия на кнопку закрытия
  closeButtonListener() {
    this.close();
  }

  // обработчик нажатия на кнопку клавиатуры
  keydownListener(evt) {
    if (isEscapeKey(evt)) {
      this.close();
    }
  }

  show() {
    const template = document.querySelector(`#${this.messageType}`);
    this.messsageDialog = template.content.cloneNode(true);
    this.closeButton = this.messsageDialog.querySelector(`.${this.messageType}__button`);
    const msgDialog = this;
    this.closeButton.addEventListener('click', this.closeButtonListenerRef = function() {
      msgDialog.closeButtonListener();
    });
    document.addEventListener('keydown', this.keydownListenerRef = function(evt) {
      msgDialog.keydownListener(evt);
    });
    document.body.append(this.messsageDialog);
  }

  close() {
    document.removeEventListener('keydown', this.keydownListenerRef);
    this.closeButton.removeEventListener('click', this.closeViewerButtonListenerRef);
    document.body.querySelector(`.${this.messageType}`).remove();
    if (this.formShowCallback !== undefined) {
      this.formShowCallback();
    }
  }
}

export {getRandomInteger, isEscapeKey, showAlert, MesssageDialog};
