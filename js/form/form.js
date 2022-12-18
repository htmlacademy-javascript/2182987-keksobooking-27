const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

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

export {makeAdFormDisable, makeAdFormActive, makeFilterFormDisable, makeFilterFormActive};

