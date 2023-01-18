import {ROOMS_OPTIONS_QTY, GUESTS_OPTIONS_QTY, OfferTypes} from '../common/params.js';
import {priceInput, typeSelect, pristine} from './form-utils.js';

const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

/* ВАЛИДАЦИЯ  СВЯЗАННЫХ ПОЛЕЙ - ГОСТЕЙ И КОМНАТ */
// Тексты ошибок
const getRoomsErrorText = () => `Для указанного количества гостей, вы можете выбрать одно из следующих значений
  для комнат: ${GUESTS_OPTIONS_QTY[capacity.value]}.`;
const getGuestsErrorText = () => `Для указанного количества комнат, вы можете выбрать одно из следующих значений
  для кол-ва гостей: ${ROOMS_OPTIONS_QTY[rooms.value]}.`;


// Добавление валидаторов
pristine.addValidator(rooms,
  (value) => ROOMS_OPTIONS_QTY[value].includes(capacity.value),
  getRoomsErrorText
);
pristine.addValidator(capacity,
  (value) => GUESTS_OPTIONS_QTY[value].includes(rooms.value),
  getGuestsErrorText
);

// Связывание полей через прослушку изменений
const onRoomNumberChange = () => {
  pristine.validate(capacity);
  pristine.validate(rooms);
};
const onRoomCapacityChange = () => {
  pristine.validate(capacity);
  pristine.validate(rooms);
};

// Добавление прослушек
rooms.addEventListener('change', onRoomNumberChange);
capacity.addEventListener('change', onRoomCapacityChange);
/* ------ */

/*--- ВАЛИДАЦИЯ  МИНИМАЛЬНОЙ ЦЕНЫ  ---*/
// Функция проверки
const checkMinPrice = () => +OfferTypes[(typeSelect.value).toUpperCase()].minValue <= priceInput.value;

// Текст ошибки
const createMinPriceErrorMsg = () => `Минимальная цена для категории ${OfferTypes[(typeSelect.value).toUpperCase()].name}:
    ${OfferTypes[(typeSelect.value).toUpperCase()].MIN_VALUE}`;

// Добавление валидатора
pristine.addValidator(
  priceInput,
  checkMinPrice,
  createMinPriceErrorMsg
);

// Обновление валидации
const onTypeChange = () => {
  pristine.validate(priceInput);
};

// Добавление прослушки для смены типа
typeSelect.addEventListener('change', onTypeChange);

export {pristine};
