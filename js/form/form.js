import {
  addChangeTypeListener,
  addChangeTimeListeners,
  setDefaultAddressValue,
  addLMarkerMoveListener,
  addChangePriceSliderListener,
  addChangePriceInputListener,
  addOfferFormSubmitListener,
  addResetListener
} from './form-utils.js';
import './validation.js';
import {initPriceSlider} from './priceSlider.js';

// Прослушка смены типа объявления. Изменение параметров.
addChangeTypeListener();

// Прослушка смены времени - связывание селектов
addChangeTimeListeners();

// Дефолтное значение для поля локации
setDefaultAddressValue();

// Прослушка перемещения маркера
addLMarkerMoveListener();

// Инициализация слайдера цены
initPriceSlider();

// Прослушка изменений цены (ползунок и поле цены)
addChangePriceSliderListener();
addChangePriceInputListener();

// Отправка формы
addOfferFormSubmitListener();

// Очистка формы
addResetListener();
