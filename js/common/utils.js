// Проверка нажатой клавиши Esc
const isEscape = (evt) => evt.key === 'Escape';

/*Функции оптимизации. Источник: HTML Academy*/
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscape, debounce};
