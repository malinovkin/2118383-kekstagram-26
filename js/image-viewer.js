import {isEscapeKey} from './util.js';

class ImageViewer {
  constructor() {
    this.bigPicture = document.querySelector('.big-picture');
    this.closeViewerButton = document.querySelector('#picture-cancel');
    this.bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    this.bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  // обработчик нажатия на крестик
  closeViewerButtonListener() {
    this.close();
  }

  // обработчик нажатия на кнопку клавиатуры
  keydownListener(evt) {
    if (isEscapeKey(evt)) {
      this.close();
    }
  }

  show(image) {
    const imageViewer = this;
    this.closeViewerButton.addEventListener('click', this.closeViewerButtonListenerRef = function() {
      imageViewer.closeViewerButtonListener();
    });
    document.addEventListener('keydown', this.keydownListenerRef = function(evt) {
      imageViewer.keydownListener(evt);
    });
    this.bigPicture.querySelector('.big-picture__img img').setAttribute('src', image.url);
    this.bigPicture.querySelector('.likes-count').textContent = image.likes;
    this.bigPicture.querySelector('.social__caption').textContent = image.description;
    let socialComment = '';
    image.comments.forEach((comment) => {
      socialComment += `<li class="social__comment">
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p></li>`;
    });
    this.bigPicture.querySelector('.social__comments').innerHTML = socialComment;
    this.bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  close() {
    document.removeEventListener('keydown', this.keydownListenerRef);
    this.closeViewerButton.removeEventListener('click', this.closeViewerButtonListenerRef);
    this.bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

export {ImageViewer};
