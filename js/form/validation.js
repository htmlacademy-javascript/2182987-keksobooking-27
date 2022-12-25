import {ROOMS_OPTIONS_QTY, GUESTS_OPTIONS_QTY, OfferTypes} from '../common/params.js';
import {priceInput, typeSelect, pristine} from './form-utils.js';

const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

/* ВАЛИДАЦИЯ  СВЯЗАННЫХ ПОЛЕЙ - ГОСТЕЙ И КОМНАТ */
// Тексты ошибок
const makeRoomsErrorText = () => `Для указанного количества гостей, вы можете выбрать одно из следующих значений
  для комнат: ${GUESTS_OPTIONS_QTY[capacity.value]}.`;
const makeGuestsErrorText = () => `Для указанного количества комнат, вы можете выбрать одно из следующих значений
  для кол-ва гостей: ${ROOMS_OPTIONS_QTY[rooms.value]}.`;


// Добавление валидаторов
pristine.addValidator(rooms,
  (value) => ROOMS_OPTIONS_QTY[value].includes(capacity.value),
  makeRoomsErrorText
);
pristine.addValidator(capacity,
  (value) => GUESTS_OPTIONS_QTY[value].includes(rooms.value),
  makeGuestsErrorText
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
const checkMinPrice = () => +OfferTypes[(typeSelect.value).toUpperCase()].MIN_VALUE <= priceInput.value;

// Текст ошибки
const createMinPriceErrorMsg = () => `Минимальная цена для категории ${OfferTypes[(typeSelect.value).toUpperCase()].NAME}:
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
/* ------ */

/*adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidForm = pristine.validate();

  if(!isValidForm) {
    pristine.getErrors();
    return;
  }
  // here api submit

});*/

export {pristine};
