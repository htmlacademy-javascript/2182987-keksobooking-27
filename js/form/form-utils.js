import {OfferTypes, DEFAULT_COORDINATES} from '../common/params.js';
import {mainMarker, resetMainMarker} from './map.js';
import {updatePriceSlider, resetPriceSlider} from './priceSlider.js';
import {sendOfferForm} from './api.js';
import {showSuccessModal, showErrorModal} from './modals.js';
import {debounce} from '../common/utils.js';

const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const priceSlider = document.querySelector('.ad-form__slider');
const resetBtn = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');
const filterTypeSelect = document.querySelector('#housing-type');
const filterPriceSelect = document.querySelector('#housing-price');
const filterRoomsSelect = document.querySelector('#housing-rooms');
const filterGuestsSelect = document.querySelector('#housing-guests');
const filterFeatures = document.querySelector('#housing-features');

// Инициализация валидации
const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
  },
  true);


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
  priceSlider.noUiSlider.on('slide', debounce(() => {
    priceInput.value = +priceSlider.noUiSlider.get() ? +priceSlider.noUiSlider.get() : '';
    pristine.validate(priceInput);
  }, 20));
};

const addChangePriceInputListener = () => {
  priceInput.addEventListener('input', () => {
    updatePriceSlider(+priceInput.getAttribute('min'));
  });
};

const resePriceInput = () => {
  priceInput.setAttribute('placeholder', OfferTypes.FLAT.MIN_VALUE);
  priceInput.setAttribute('min', OfferTypes.FLAT.MIN_VALUE);
};

const adFromReset = () => {
  adForm.reset();
  filtersForm.reset();
  pristine.reset();
  resetPriceSlider();
  setDefaultAddressValue();
  resetMainMarker();
  resePriceInput();
};

const addResetListener = () => {
  resetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFromReset();
  });
};

const addOfferFormSubmitListener = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidForm = pristine.validate();

    if(!isValidForm) {
      pristine.getErrors();
      return;
    }
    sendOfferForm(
      evt,
      () => {
        adFromReset();
        showSuccessModal();
      },
      (message) => {
        showErrorModal(message);
      });
  });
};


export {
  body,
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
  addChangePriceInputListener,
  addOfferFormSubmitListener,
  addResetListener,
  pristine,
  filtersForm,
  filterTypeSelect,
  filterPriceSelect,
  filterRoomsSelect,
  filterGuestsSelect,
  filterFeatures
};
