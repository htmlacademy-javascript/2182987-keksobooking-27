const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const fieldsetsAndSelects = [
  ...adForm.querySelectorAll('fieldset'),
  ...filtersForm.querySelectorAll('fieldset, select')
];

const makeFormsDisable = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetsAndSelects.forEach((fieldset) => {
    fieldset.setAttribute('disabled', true);
  });
};

const makeFormsActive = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetsAndSelects.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

export {makeFormsDisable, makeFormsActive};

