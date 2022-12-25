import {OfferTypes, DEFAULT_COORDINATES} from '../common/params.js';
import {mainMarker} from './map.js';
import {updatePriceSlider} from './priceSlider.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const priceSlider = document.querySelector('.ad-form__slider');

const makeAdFormDisable = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', true);
  });
};

const makeAdFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

const makeFilterFormDisable = () => {
  filtersForm.classList.add('map__filters--disabled');
  filtersForm.querySelectorAll('fieldset, select').forEach((fieldset) => {
    fieldset.setAttribute('disabled', true);
  });
};

const makeFilterFormActive = () => {
  filtersForm.classList.remove('map__filters--disabled');
  filtersForm.querySelectorAll('fieldset, select').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

const onTypeChange = (evt) => {
  priceInput.setAttribute('placeholder', OfferTypes[(evt.target.value).toUpperCase()].MIN_VALUE);
  priceInput.setAttribute('min', OfferTypes[(evt.target.value).toUpperCase()].MIN_VALUE);
  updatePriceSlider(+priceInput.getAttribute('min'));
};

const addChangeTypeListener = () => {
  typeSelect.addEventListener('change', onTypeChange);
};

// Синхрониция полей въезда и выезда
const addChangeTimeListeners = () => {
  [timeinSelect, timeoutSelect].forEach((select) => {
    select.addEventListener('change', (evt) => {
      if(evt.target === timeinSelect) {
        timeoutSelect.value = timeinSelect.value;
        return;
      }
      timeinSelect.value = timeoutSelect.value;
    });
  });
};

// Указание центра Токио
const setDefaultAddressValue = () => {
  addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;
};

// Изменение позиции маркера
const addLMarkerMoveListener = () => {
  mainMarker.on('move', (evt) => {
    addressInput.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
  });
};

/* СВЯЗЫВАНИЕ ПОЛЗУНКА И ПОЛЯ ЦЕНЫ */
const addChangePriceSliderListener = () => {
  priceSlider.noUiSlider.on('slide', () => {
    priceInput.value = +priceSlider.noUiSlider.get() ? +priceSlider.noUiSlider.get() : '';
  });
};

const addChangePriceInputListener = () => {
  priceInput.addEventListener('input', () => {
    updatePriceSlider(+priceInput.getAttribute('min'));
  });
};


export {
  makeAdFormDisable,
  makeAdFormActive,
  makeFilterFormDisable,
  makeFilterFormActive,
  addChangeTypeListener,
  addChangeTimeListeners,
  adForm,
  priceInput,
  typeSelect,
  addressInput,
  priceSlider,
  setDefaultAddressValue,
  addLMarkerMoveListener,
  addChangePriceSliderListener,
  addChangePriceInputListener
};
