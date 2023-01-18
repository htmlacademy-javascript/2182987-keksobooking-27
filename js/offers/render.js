import {OfferTypes} from '../common/params.js';
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createBalloonContent = (realEstate) => {
  const popup = popupTemplate.cloneNode(true);
  // Добавление информации для простых полей
  popup.querySelector('.popup__title').textContent = realEstate.offer.title;
  popup.querySelector('.popup__text--address').textContent = realEstate.offer.address;
  popup.querySelector('.popup__text--price').textContent = `${realEstate.offer.price} ₽/ночь`;
  popup.querySelector('.popup__type').textContent = OfferTypes[(realEstate.offer.type).toUpperCase()].name;
  popup.querySelector('.popup__text--capacity').textContent = `${realEstate.offer.rooms} комнаты для ${realEstate.offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${realEstate.offer.checkin}, выезд до ${realEstate.offer.checkout}`;
  // Описание
  if(realEstate.offer.description) {
    popup.querySelector('.popup__description').textContent = realEstate.offer.description;
  } else {
    popup.querySelector('.popup__description').remove();
  }
  // Дополнительные услуги
  if (realEstate.offer.features) {
    realEstate.offer.features.forEach((feature) => {
      popup.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
    });
  } else {
    popup.querySelector('.popup__features').remove();
  }
  // Фотографии
  if (realEstate.offer.photos) {
    const popupImgTemplate = popup.querySelector('.popup__photo');
    realEstate.offer.photos.forEach((photo) => {
      const popupImg = popupImgTemplate.cloneNode(true);
      popupImg.src = photo;
      popup.querySelector('.popup__photos').append(popupImg);
    });
    popupImgTemplate.remove();
  } else {
    popup.querySelector('.popup__photos').remove();
  }
  // Аватар
  popup.querySelector('.popup__avatar').src = realEstate.author.avatar;

  return popup;
};

export {createBalloonContent};
