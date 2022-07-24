class Thumbnails {
  constructor(imageViewer) {
    this.imageViewer = imageViewer;
  }

  draw(images) {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#picture');
    const thumbnails = this;
    images.forEach((image) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('img');
      img.setAttribute('src', image.url);
      if (thumbnails.imageViewer !== undefined) {
        img.addEventListener('click', () => {
          thumbnails.imageViewer.show(image);
        });
      }
      clone.querySelector('.picture__likes').textContent = image.likes;
      clone.querySelector('.picture__comments').textContent = image.comments.length;
      fragment.appendChild(clone);
    });
    document.querySelector('.pictures').appendChild(fragment);
  }
}

export {Thumbnails};
