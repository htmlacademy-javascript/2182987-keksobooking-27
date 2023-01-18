import {MAX_PRICE, OfferTypes} from '../common/params.js';
import {priceSlider, priceInput} from './form-utils.js';

const DEFAULT_SLIDER_OPTIONS = {
  start: 0,
  step: 1,
  connect: 'lower',
  range: {
    'min': OfferTypes.FLAT.MIN_VALUE,
    'max': MAX_PRICE
  }
};

const initPriceSlider = () => {
  noUiSlider.create(priceSlider, DEFAULT_SLIDER_OPTIONS);
};

const resetPriceSlider = () => {
  priceSlider.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);
};

const updatePriceSlider = (minPrice) => {
  priceSlider.noUiSlider.updateOptions({
    start: +priceInput.value,
    step: 1,
    range: {
      'min': minPrice ?? 0,
      'max': MAX_PRICE
    }
  });
};

export {initPriceSlider, updatePriceSlider, resetPriceSlider};
