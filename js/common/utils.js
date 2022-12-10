// Функции-генераторы случайного числа (основаны на https://learn.javascript.ru/task/random-int-min-max)
function getRandomInt(min, max) {
  if(Array.from(arguments).find((element) => (typeof element !== 'number' || element < 0))) {
    return NaN;
  }
  if(min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  return Math.floor(min + Math.random() * (max - min));
}

function getRandomFloat(min, max, floatTo) {
  if(Array.from(arguments).find((element) => (typeof element !== 'number' || element < 0))) {
    return NaN;
  }
  if(min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  return +(min + Math.random() * (max - min)).toFixed(floatTo);
}

// Генерация локации
const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng:  getRandomFloat(139.70000, 139.80000, 5)
});

export {getRandomInt, getRandomFloat, createLocation};
