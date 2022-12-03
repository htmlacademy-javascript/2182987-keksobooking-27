import { REAL_ESTATE_TITLES, REAL_ESTATE_DESCRIPTIONS, REAL_ESTATE_TYPES, TIMES, FEATURES, PHOTOS } from './params.js';

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

getRandomInt(-1, 10);
getRandomFloat(1.1, 1.9, -3);


// Генерация локации
const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng:  getRandomFloat(139.70000, 139.80000, 5)
});

// Генератор объектов
const generateRealEstates = (length) => {
  const realEstates = [];
  for(let i = 0; i < length; i++) {
    const location = createLocation();
    const time = TIMES[getRandomInt(0, TIMES.length)];
    realEstates[i] = {
      author: {
        avatar: `img/avatars/user${i < length - 1 ? '0' : ''}${i + 1}.png`
      },
      offer : {
        title: REAL_ESTATE_TITLES[getRandomInt(0, REAL_ESTATE_TITLES.length)],
        address: `${location.lat}, ${location.lng}`,
        price: getRandomInt(30, 100000),
        type: REAL_ESTATE_TYPES[getRandomInt(0, REAL_ESTATE_TYPES.length)],
        rooms: getRandomInt(1, 100),
        guests: getRandomInt(0, 3),
        checkin: time,
        checkout: time,
        features: FEATURES.slice(0, getRandomInt(1, FEATURES.length)),
        description: REAL_ESTATE_DESCRIPTIONS[getRandomInt(0, REAL_ESTATE_DESCRIPTIONS.length)],
        photos: PHOTOS.slice(0, getRandomInt(1, PHOTOS.length))
      },
      location
    };
  }
  return realEstates;
};

export {generateRealEstates};
