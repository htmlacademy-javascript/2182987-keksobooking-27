import {getRandomInt, createLocation} from '../common/utils.js';
import {TIMES, REAL_ESTATE_TYPES, FEATURES} from '../common/params.js';

// Названия объявлений
const REAL_ESTATE_TITLES = [
  '1-комнатная квартира, 25 м², Телецентр, Кишинёв, Кишинёв мун.',
  '1-комнатная квартира, 25 м², Телецентр, Кишинёв, Кишинёв мун.',
  '1-комнатная квартира, 45 м², Рышкановка, Кишинёв',
  '2-х комнатная квартира, 65 м², Буюканы, Кишинёв',
  '2-х комнатная квартира, 69 м², Ботаника, Кишинёв',
  '1-комнатная квартира, 54 м², Дурлешты, Кишинёв',
  '3-х комнатная квартира, 72 м², Скулянка, Кишинёв',
  '3-х комнатная квартира, 73 м², Рышкановка, Кишинёв',
  '1-комнатная квартира, 17 м², Буюканы, Кишинёв',
  '1-комнатная квартира, 35 м², Телецентр, Кишинёв',
  '2-комнатная квартира, 38 м², Скулянка, Кишинёв'
];

// Описания для объявления
const REAL_ESTATE_DESCRIPTIONS = [
  'ЦЕНА ДЕЙСТВИТЕЛЬНА ПРИ БРОНИРОВАНИИ В НОЯБРЕ. ПОДЗЕМНАЯ ПАРКОВКА И УБОРКА ВКЛЮЧЕНЫ!',
  'ЦЕНА ДЕЙСТВИТЕЛЬНА ПРИ БРОНИРОВАНИИ В НОЯБРЕ. ПОДЗЕМНАЯ ПАРКОВКА И УБОРКА ВКЛЮЧЕНЫ!',
  'БЕЗ КОМИССИИ. Уникальный угловой апартамент с завораживающим панорамными видами в знаковом комплексе премиум-класса Neva Towers. От собственника, сдаются впервые. ',
  'ВЫГОДНОЕ ВТОРИЧНОЕ ПРЕДЛОЖЕНИЕ ОТ ОФИЦИАЛЬНОГО ДЕПАРТАМЕНТА ЗАСТРОЙЩИКА.',
  'Функциональные апартаменты с панорамным остеклением и с отделкой. Планировка: гостиная с кухней,  2 спальни, ванная. ',
  'В ночное время огни небоскребов никого не оставят равнодушными. Интерьеры входной группы разработаны бюро HBA, которым доверяют ведущие отельные операторы класса люкс. ',
  'Многоуровневый паркинг. Круглосуточная система охраны и безопасности комплекса, услуги клининга. ',
  'В шаговой доступности ТЦ "Афимолл Сити", Пресненская набережная, станции метро Выставочная, Международная и Деловой центр, парк Красная Пресня. Быстрый выезд на ТТК и Кутузовский проспект.',
  'Планировка: гостиная с кухней с барной стойкой, спальня с встроенными гардеробными шкафами, ванная с сантехникой, холл с гардеробными.  ',
  'Апартаменты готовы для проживания и полностью укомплектованы всем необходимым вплоть до посуды и постельного белья.',
  'Для некурящих. Без домашних животных.'
];

// Временные фото
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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
