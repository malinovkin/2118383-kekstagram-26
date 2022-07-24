class ImageViewer {
  constructor() {
    this.bigPicture = document.querySelector('.big-picture');
    this.closeViewerButton = document.querySelector('#picture-cancel');
    this.bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    this.bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  show(image) {
    const imageViewer = this;
    this.closeViewerListener = function() {
      imageViewer.close();
    };
    document.addEventListener('keydown', this.closeViewerListener);
    this.closeViewerButton.addEventListener('click', this.closeViewerListener);
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
    document.removeEventListener('keydown', this.closeViewerListener);
    this.closeViewerButton.removeEventListener('click', this.closeViewerListener);
    this.bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

export {ImageViewer};
