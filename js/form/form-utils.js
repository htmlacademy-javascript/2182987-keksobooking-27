import {OfferTypes, DEFAULT_COORDINATES, DEFAULT_AVATAR_SRC} from '../common/params.js';
import {mainMarker, resetMainMarker, setDefaultMarkers} from './map-and-filters.js';
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
const photoInput = document.querySelector('#images');
const photoHolder = document.querySelector('.ad-form__photo');
const avatarInput = document.querySelector('#avatar');
const avatarImage = document.querySelector('.ad-form-header__preview img');
const submitButton = document.querySelector('.ad-form__submit');

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
  priceInput.setAttribute('placeholder', OfferTypes[(evt.target.value).toUpperCase()].minValue);
  priceInput.setAttribute('min', OfferTypes[(evt.target.value).toUpperCase()].minValue);
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

const resetPriceInput = () => {
  priceInput.setAttribute('placeholder', OfferTypes.FLAT.minValue);
  priceInput.setAttribute('min', OfferTypes.FLAT.minValue);
};

const resetAdForm = () => {
  adForm.reset();
  filtersForm.reset();
  pristine.reset();
  resetPriceSlider();
  setDefaultAddressValue();
  resetMainMarker();
  resetPriceInput();
  setDefaultMarkers();
  if(photoHolder.querySelector('img')) {
    photoHolder.querySelector('img').remove();
  }
  avatarImage.src = DEFAULT_AVATAR_SRC;
};

const addResetListener = () => {
  resetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetAdForm();
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

    submitButton.setAttribute('disabled', true);
    sendOfferForm(
      evt,
      () => {
        resetAdForm();
        showSuccessModal();
        submitButton.removeAttribute('disabled');
      },
      (message) => {
        showErrorModal(message);
        submitButton.removeAttribute('disabled');
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
  filterFeatures,
  photoHolder,
  photoInput,
  avatarInput,
  avatarImage
};
