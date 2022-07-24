class Thumbnails {
  constructor(form) {
    this.form = form;
    this.bigPicture = document.querySelector('.big-picture');
    this.pictureCancel = document.getElementById('picture-cancel');
    this.bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    this.bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  draw(images) {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#picture');
    const thumbnails = this;
    images.forEach((image) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('img');
      img.setAttribute('src', image.url);
      img.addEventListener('click', () => {
        thumbnails.showBigImage(image);
      });
      clone.querySelector('.picture__likes').textContent = image.likes;
      clone.querySelector('.picture__comments').textContent = image.comments.length;
      fragment.appendChild(clone);
    });
    document.querySelector('.pictures').appendChild(fragment);
  }

  showBigImage(image) {
    const thumbnails = this;
    this.closeBigImageListener = function() {
      thumbnails.closeBigImage();
    };
    document.body.addEventListener('keydown', this.closeBigImageListener);
    this.pictureCancel.addEventListener('click', this.closeBigImageListener);
    this.bigPicture.addEventListener('click', this.closeBigImageListener);
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

  closeBigImage() {
    document.body.removeEventListener('keydown', this.closeBigImageListener);
    this.pictureCancel.removeEventListener('click', this.closeBigImageListener);
    this.bigPicture.removeEventListener('click', this.closeBigImageListener);
    this.bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

export {Thumbnails};
