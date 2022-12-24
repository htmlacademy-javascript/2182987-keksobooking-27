import {
  adChangeTypeListener,
  adChangeTimeListeners,
  setDefaultAddressValue,
  addLMarkerMoveListener
} from './form-utils.js';
import './validation.js';

// Прослушка смены типа объявления. Изменение параметров.
adChangeTypeListener();

// Прослушка смены времени - связывание селектов
adChangeTimeListeners();

// Дефолтное значение для поля локации
setDefaultAddressValue();

//
addLMarkerMoveListener();
