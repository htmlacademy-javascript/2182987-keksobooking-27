// Типы объявлений
const REAL_ESTATE_TYPES = [
  'flat',
  'bungalow',
  'house',
  'palace',
  'hotel'
];

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

// Время
const TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

// Доп. условия
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

// Кол-во объектов
const OBJECTS_QUANTITY = 10;

// Кол-во гостей и комнаты
const GuestsOptionsQty = {
  '1': [
    'для 1 гостя'
  ],
  '2': [
    'для 1 гостя',
    'для 2 гостей'
  ],
  '3': [
    'для 1 гостя',
    'для 2 гостей',
    'для 3 гостей'
  ],
  '100': [
    'не для гостей'
  ]
};

export { REAL_ESTATE_TYPES, TIMES, FEATURES, OBJECTS_QUANTITY, OfferTypes, GuestsOptionsQty};


