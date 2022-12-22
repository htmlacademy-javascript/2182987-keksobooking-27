import {RoomsOptionsQty, GuestsOptionsQty, OfferTypes} from '../common/params.js';

const adForm = document.querySelector('.ad-form');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

// Инициализация валидации
const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
  },
  true);

/* ВАЛИДАЦИЯ  СВЯЗАННЫХ ПОЛЕЙ - ГОСТЕЙ И КОМНАТ */
// Тексты ошибок
const makeRoomsErrorText = () => `Для указанного количества гостей, вы можете выбрать одно из следующих значений
  для комнат: ${GuestsOptionsQty[capacity.value]}.`;
const makeGuestsErrorText = () => `Для указанного количества комнат, вы можете выбрать одно из следующих значений
  для кол-ва гостей: ${RoomsOptionsQty[rooms.value]}.`;

// Добавление валидаторов
pristine.addValidator(rooms,
  (value) => RoomsOptionsQty[value].includes(capacity.value),
  makeRoomsErrorText
);
pristine.addValidator(capacity,
  (value) => GuestsOptionsQty[value].includes(rooms.value),
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
const checkMinPrice = () => +OfferTypes[(type.value).toUpperCase()].MIN_VALUE <= price.value;

// Текст ошибки
const createMinPriceErrorMsg = () => `Минимальная цена для категории ${OfferTypes[(type.value).toUpperCase()].NAME}:
    ${OfferTypes[(type.value).toUpperCase()].MIN_VALUE}`;

// Добавление валидатора
pristine.addValidator(
  price,
  checkMinPrice,
  createMinPriceErrorMsg
);

// Обновление валидации
const onTypeChange = () => {
  pristine.validate(price);
};

// Добавление прослушки для смены типа
type.addEventListener('change', onTypeChange);
/* ------ */

// Синхрониция полей въезда и выезда
[timein, timeout].forEach((select) => {
  select.addEventListener('change', (evt) => {
    if(evt.target === timein) {
      timeout.value = timein.value;
      return;
    }
    timein.value = timeout.value;
  });
});

// Добавление обработчка
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidForm = pristine.validate();

  if(isValidForm) {
    evt.target.submit();
    return;
  }
  pristine.getErrors();
});
