function drawThumbnails(images) {
  const template = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();
  images.forEach((image) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('img').setAttribute('src', image.url);
    clone.querySelector('.picture__likes').textContent = image.likes;
    clone.querySelector('.picture__comments').textContent = image.comments.length;
    fragment.appendChild(clone);
  });
  document.querySelector('.pictures').appendChild(fragment);
}
export {drawThumbnails};
