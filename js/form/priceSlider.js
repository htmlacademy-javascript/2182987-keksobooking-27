import {MAX_PRICE, OfferTypes} from '../common/params.js';
import {priceSlider, priceInput} from './form-utils.js';

const initPriceSlider = () => {
  noUiSlider.create(priceSlider, {
    start: 0,
    step: 1,
    connect: 'lower',
    range: {
      'min': OfferTypes.FLAT.MIN_VALUE,
      'max': MAX_PRICE
    }
  });
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

export {initPriceSlider, updatePriceSlider};
