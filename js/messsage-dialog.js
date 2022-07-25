import {isEscapeKey} from './util.js';

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

  // обработчик клика мышью по документу
  documentClickListener(evt) {
    const withinBoundaries = evt.composedPath().includes(this.messsageDialog.children[0]);
    if (!withinBoundaries) {
      this.close();
    }
  }

  show() {
    const template = document.querySelector(`#${this.messageType}`);
    const clone = template.content.cloneNode(true);
    this.closeButton = clone.querySelector(`.${this.messageType}__button`);
    const msgDialog = this;
    this.closeButton.addEventListener('click', this.closeButtonListenerRef = function() {
      msgDialog.closeButtonListener();
    });
    document.addEventListener('keydown', this.keydownListenerRef = function(evt) {
      msgDialog.keydownListener(evt);
    });
    document.addEventListener('click', this.documentClickListenerRef = function(evt) {
      msgDialog.documentClickListener(evt);
    });
    document.body.append(clone);
    this.messsageDialog = document.querySelector(`.${this.messageType}`);
  }

  close() {
    document.removeEventListener('keydown', this.keydownListenerRef);
    document.removeEventListener('click', this.documentClickListenerRef);
    this.closeButton.removeEventListener('click', this.closeViewerButtonListenerRef);
    this.messsageDialog.parentNode.removeChild(this.messsageDialog);
    if (this.formShowCallback !== undefined) {
      this.formShowCallback();
    }
  }
}

export {MesssageDialog};
