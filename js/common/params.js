// Кол-во объектов
const OBJECTS_QUANTITY = 10;

// Кол-во гостей и комнаты
const ROOMS_OPTIONS_QTY = {
  '1': [
    '1'
  ],
  '2': [
    '1',
    '2'
  ],
  '3': [
    '1',
    '2',
    '3'
  ],
  '100': [
    '0'
  ]
};

const GUESTS_OPTIONS_QTY = {
  '1': [
    '1',
    '2',
    '3'
  ],
  '2': [
    '2',
    '3'
  ],
  '3': [
    '3'
  ],
  '0': [
    '100'
  ]
};

const DEFAULT_COORDINATES = {
  lat: 35.6750,
  lng: 139.7500
};

const MAX_PRICE = 100000;

const DEFAULT_ZOOM = 12.8;

const API_ADDRESS = 'https://27.javascript.pages.academy/keksobooking';

const PRICE_RANGE = {
  LOW : {
    MIN: 0,
    MAX: 10000
  },
  MIDDLE : {
    MIN: 10000,
    MAX: 50000
  },
  HIGH : {
    MIN: 50000,
    MAX: MAX_PRICE
  },
};

const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

// Типы предложений
const OfferTypes = {
  FLAT: {
    NAME: 'Квартира',
    MIN_VALUE: 1000
  },
  BUNGALOW: {
    NAME: 'Бунгало',
    MIN_VALUE: 0
  },
  HOUSE: {
    NAME: 'Дом',
    MIN_VALUE: 5000
  },
  PALACE: {
    NAME: 'Дворец',
    MIN_VALUE: 10000
  },
  HOTEL: {
    NAME: 'Отель',
    MIN_VALUE: 3000
  },
};

export {
  OBJECTS_QUANTITY,
  OfferTypes,
  ROOMS_OPTIONS_QTY,
  GUESTS_OPTIONS_QTY,
  DEFAULT_COORDINATES,
  MAX_PRICE,
  DEFAULT_ZOOM,
  API_ADDRESS,
  PRICE_RANGE,
  DEFAULT_AVATAR_SRC
};
