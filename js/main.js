

// Функция-генератор случайного числа (основана на https://learn.javascript.ru/task/random-int-min-max)

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
  return Math.floor(min + Math.random() * (max + 1 - min));
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

console.log(getRandomInt(-1, 10));
console.log(getRandomFloat(1.1, 1.9, -3));
