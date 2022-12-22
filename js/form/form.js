import {makeAdFormActive, makeFilterFormActive, adChangeTypeListener, adChangeTimeListeners} from './form-utils.js';
import './validation.js';

// Добавление активности формам
makeAdFormActive();
makeFilterFormActive();

// Прослушка смены типа объявления. Изменение параметров.
adChangeTypeListener();

// Прослушка смены времени - связывание селектов
adChangeTimeListeners();
