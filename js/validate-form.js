class ValidateForm {
  // максимальное количество меток к фотографии
  static get MAX_TAGS_COUNT() {
    return 5;
  }

  // максимальная длина комментария
  static get MAX_COMMENT_LENGTH() {
    return 140;
  }

  // метод проверки хэш-тегов
  static validateTags(tags) {
    let result = true;
    if (tags.value !== '') {
      result = false;
      // приводим строку тегов к нижнему регистру, разбиваем теги в массив и удаляем из массива пустые строки
      const tagsArray = tags.value.toLowerCase().split(' ').filter(Boolean);
      const re = /^#[a-zа-яё0-9]{1,19}$/;
      const unique = Array.from(new Set(tagsArray));
      if ((tagsArray.length === unique.length) && (tagsArray.length <= ValidateForm.MAX_TAGS_COUNT)) {
        for (let i = 0; i < tagsArray.length; i++) {
          result = re.test(tagsArray[i]);
          if (!result) {
            break;
          }
        }
      }
    }
    return result;
  }

  // метод проверки комментария
  static validateComment(comment) {
    return comment.value.length <= ValidateForm.MAX_COMMENT_LENGTH;
  }
}

export {ValidateForm};
