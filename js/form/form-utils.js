import {OfferTypes} from '../common/params.js';
const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

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
};

const adChangeTypeListener = () => {
  typeSelect.addEventListener('change', onTypeChange);
};

// Синхрониция полей въезда и выезда
const adChangeTimeListeners = () => {
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

export {makeAdFormDisable, makeAdFormActive, makeFilterFormDisable, makeFilterFormActive, adChangeTypeListener, adChangeTimeListeners, adForm, priceInput, typeSelect };
