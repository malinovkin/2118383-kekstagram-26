class ValidateForm {
  // метод проверки хэш-тегов
  static validateTags(tags) {
    let result = true;
    if (tags.value !== '') {
      result = false;
      // приводим строку тегов к нижнему регистру, разбиваем теги в массив и удаляем из массива пустые строки
      const tagsArray = tags.value.toLowerCase().split(' ').filter(Boolean);
      const re = /^#[a-zа-яё0-9]{1,19}$/;
      const unique = Array.from(new Set(tagsArray));
      if ((tagsArray.length === unique.length) && (tagsArray.length <= 5)) {
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
    if (comment.value.length <= 140) {
      return true;
    }
    return false;
  }
}

export {ValidateForm};
