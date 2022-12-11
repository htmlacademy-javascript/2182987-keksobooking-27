import {renderOffers} from './offers/render.js';
import {makeFormsActive, makeFormsDisable} from './form/form.js';

renderOffers();
makeFormsDisable();

setTimeout(() => {
  makeFormsActive();
}, 3000);
