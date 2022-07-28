import {isEscapeKey} from './util.js';

class ImageViewer {
  constructor() {
    this.bigPicture = document.querySelector('.big-picture');
    this.closeViewerButton = document.querySelector('#picture-cancel');
    this.commentsHeader = this.bigPicture.querySelector('.social__comment-count');
    this.commentsHeaderCount = this.commentsHeader.querySelector('.comments-count');
    this.commentsList = this.bigPicture.querySelector('.social__comments');
    this.commentsLoaderButton = this.bigPicture.querySelector('.comments-loader');
    this.bigPictureImg = this.bigPicture.querySelector('.big-picture__img img');
    this.bigPictureLikesCount = this.bigPicture.querySelector('.likes-count');
    this.bigPictureDescription = this.bigPicture.querySelector('.social__caption');
  }

  // максимальное количество комментариев для 1 загрузки
  static get NUMBER_COMMENTS_TO_LOAD() {
    return 5;
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

  // показ следующей партии комментариев
  showNextComments() {
    let newCommentsCount = this.loadedCommentsCount + ImageViewer.NUMBER_COMMENTS_TO_LOAD;
    if (newCommentsCount >= this.comments.length) {
      newCommentsCount = this.comments.length;
      // скрытие кнопки загрузки следующей партии комментариев
      this.commentsLoaderButton.classList.add('hidden');
    }
    for (let i = this.loadedCommentsCount; i < newCommentsCount; i++) {
      const li = document.createElement('LI');
      li.setAttribute('class', 'social__comment');
      li.innerHTML = `<img class="social__picture" src="${this.comments[i].avatar}" alt="${this.comments[i].name}"
        width="35" height="35"><p class="social__text">${this.comments[i].message}</p>`;
      this.commentsList.append(li);
    }
    this.commentsHeader.firstChild.textContent = `${newCommentsCount} из `;
    this.loadedCommentsCount = newCommentsCount;
  }

  show(image) {
    const imageViewer = this;
    this.closeViewerButtonListenerRef = () => imageViewer.closeViewerButtonListener();
    this.closeViewerButton.addEventListener('click', this.closeViewerButtonListenerRef);
    this.keydownListenerRef = (evt) => imageViewer.keydownListener(evt);
    document.addEventListener('keydown', this.keydownListenerRef);
    this.bigPictureImg.setAttribute('src', image.url);
    this.bigPictureLikesCount.textContent = image.likes;
    this.bigPictureDescription.textContent = image.description;
    // комментарии
    this.comments = image.comments;
    this.loadedCommentsCount = 0;
    this.commentsList.innerHTML = '';
    this.commentsHeaderCount.textContent = String(this.comments.length);
    this.commentsLoaderButton.classList.remove('hidden');
    this.commentsLoaderButtonListenerRef = () => imageViewer.showNextComments();
    this.commentsLoaderButton.addEventListener('click', this.commentsLoaderButtonListenerRef);
    this.showNextComments();
    this.bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  close() {
    document.removeEventListener('keydown', this.keydownListenerRef);
    this.closeViewerButton.removeEventListener('click', this.closeViewerButtonListenerRef);
    this.commentsLoaderButton.removeEventListener('click', this.commentsLoaderButtonListenerRef);
    this.bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

export {ImageViewer};
