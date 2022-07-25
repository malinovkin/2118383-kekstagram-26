// Функция возвращает случайное целое число из переданного диапазона включительно.
// Если входные данные не корректны, то функция возвращает -1
function getRandomInteger(minValue, maxValue) {
  return ((minValue >= 0) && (minValue < maxValue)) ?
    Math.floor(minValue + Math.random() * (maxValue - minValue + 1)) : -1;
}

function isEscapeKey(event) {
  return event.key === 'Escape';
}

export {getRandomInteger, isEscapeKey};
