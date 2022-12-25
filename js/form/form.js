import {
  adChangeTypeListener,
  adChangeTimeListeners,
  setDefaultAddressValue,
  addLMarkerMoveListener,
  addChangePriceSliderListener,
  addChangePriceInputListener
} from './form-utils.js';
import './validation.js';
import {initPriceSlider} from './priceSlider.js';

// Прослушка смены типа объявления. Изменение параметров.
adChangeTypeListener();

// Прослушка смены времени - связывание селектов
adChangeTimeListeners();

// Дефолтное значение для поля локации
setDefaultAddressValue();

// Прослушка перемещения маркера
addLMarkerMoveListener();

// Инициализация слайдера цены
initPriceSlider();

// Прослушка изменений цены (ползунок и поле цены)
addChangePriceSliderListener();
addChangePriceInputListener();
