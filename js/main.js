import {renderOffers} from './offers/render.js';
import {makeAdFormActive, makeFilterFormActive} from './form/form.js';

renderOffers();

setTimeout(() => {
  makeAdFormActive();
  makeFilterFormActive();
}, 3000);
