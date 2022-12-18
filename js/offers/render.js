import {generateRealEstates} from '../temp/mocks.js';
import {OBJECTS_QUANTITY, OfferTypes} from '../common/params.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');
const renderOffers = () => {
  generateRealEstates(OBJECTS_QUANTITY).forEach((realEstate) => {
    const popup = popupTemplate.cloneNode(true);
    popup.querySelector('.popup__title').textContent = realEstate.offer.title;
    popup.querySelector('.popup__text--address').textContent = realEstate.offer.address;
    popup.querySelector('.popup__text--price').textContent = `${realEstate.offer.price} ₽/ночь`;
    popup.querySelector('.popup__type').textContent = OfferTypes[(realEstate.offer.type).toUpperCase()];
    popup.querySelector('.popup__text--capacity').textContent = `${realEstate.offer.rooms} комнаты для ${realEstate.offer.guests} гостей`;
    popup.querySelector('.popup__text--time').textContent = `Заезд после ${realEstate.offer.checkin}, выезд до ${realEstate.offer.checkout}`;
    popup.querySelector('.popup__description').textContent = realEstate.offer.description;
    realEstate.offer.features.forEach((feature) => {
      popup.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
    });
    const popupImgTemplate = popup.querySelector('.popup__photo');
    realEstate.offer.photos.forEach((photo) => {
      const popupImg = popupImgTemplate.cloneNode(true);
      popupImg.src = photo;
      popup.querySelector('.popup__photos').append(popupImg);
    });
    popupImgTemplate.remove();

    popup.querySelector('.popup__avatar').src = realEstate.author.avatar;
    map.append(popup);
  });
};

export {renderOffers};
