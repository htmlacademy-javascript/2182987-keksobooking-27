import {getRandomInt, createLocation} from '../common/utils.js';
import {TIMES, REAL_ESTATE_TITLES, REAL_ESTATE_TYPES, REAL_ESTATE_DESCRIPTIONS, FEATURES, PHOTOS} from '../common/params.js';

// Генератор объектов
const generateRealEstates = (qty) => {
  const realEstates = [];
  for(let i = 0; i < qty; i++) {
    const location = createLocation();
    const time = TIMES[getRandomInt(0, TIMES.length)];
    realEstates[i] = {
      author: {
        avatar: `img/avatars/user${i < qty - 1 ? '0' : ''}${i + 1}.png`
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
        features: FEATURES.slice(0, getRandomInt(1, FEATURES.length + 1)),
        description: REAL_ESTATE_DESCRIPTIONS[getRandomInt(0, REAL_ESTATE_DESCRIPTIONS.length)],
        photos: PHOTOS.slice(0, getRandomInt(1, PHOTOS.length + 1))
      },
      location
    };
  }
  return realEstates;
};

export {generateRealEstates};
