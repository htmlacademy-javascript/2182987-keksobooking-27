import {generateRealEstates} from '../temp/mocks.js';
import {OBJECTS_QUANTITY, OfferTypes} from '../common/params.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');
const renderOffers = () => {
  generateRealEstates(OBJECTS_QUANTITY).forEach((realEstate) => {
    const popup = popupTemplate.cloneNode(true);
    /*
      В данном массиве хранится информация о каждом пункте объявления
      1. domElement - элемент, в котором отображается информация
      2. offerValue - значение из генератора/api, соответствующее пункту
      3. uiValue - значение, которое необходимо отобразить на странице.
        (используется для отображения простых значений)
      4. renderUI - метод. используется отображения более сложных значений
    */
    const offerValues = [
      {
        domElement: popup.querySelector('.popup__title'),
        offerValue: realEstate.offer.title,
        uiValue: realEstate.offer.title
      },
      {
        domElement: popup.querySelector('.popup__text--address'),
        offerValue: realEstate.offer.address,
        uiValue: realEstate.offer.address
      },
      {
        domElement: popup.querySelector('.popup__text--price'),
        offerValue: realEstate.offer.price,
        uiValue:`${realEstate.offer.price} ₽/ночь`
      },
      {
        domElement: popup.querySelector('.popup__type'),
        offerValue: realEstate.offer.type,
        uiValue: OfferTypes[(realEstate.offer.type).toUpperCase()]
      },
      {
        domElement: popup.querySelector('.popup__text--capacity'),
        offerValue: realEstate.offer.rooms && realEstate.offer.guests,
        uiValue: `${realEstate.offer.rooms} комнаты для ${realEstate.offer.guests} гостей`
      },
      {
        domElement: popup.querySelector('.popup__text--time'),
        offerValue: realEstate.offer.checkin && realEstate.offer.checkout,
        uiValue: `Заезд после ${realEstate.offer.checkin}, выезд до ${realEstate.offer.checkout}`
      },
      {
        domElement: popup.querySelector('.popup__features'),
        offerValue: realEstate.offer.features,
        uiValue: false,
        renderUI() {
          realEstate.offer.features.forEach((feature) => {
            this.domElement.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
          });
        }
      },
      {
        domElement: popup.querySelector('.popup__description'),
        offerValue: realEstate.offer.description,
        uiValue: realEstate.offer.description
      },
      {
        domElement: popup.querySelector('.popup__photos'),
        offerValue: realEstate.offer.photos,
        uiValue: false,
        renderUI() {
          const popupImgTemplate = popup.querySelector('.popup__photo');
          this.offerValue.forEach((photo) => {
            const popupImg = popupImgTemplate.cloneNode(true);
            popupImg.src = photo;
            popup.querySelector('.popup__photos').append(popupImg);
          });
          popupImgTemplate.remove();
        }
      },
      {
        domElement: popup.querySelector('.popup__avatar'),
        offerValue: realEstate.author.avatar,
        uiValue: false,
        renderUI() {
          this.domElement.src = this.offerValue;
        }
      },
    ];

    offerValues.forEach((element) => {
      if(element.offerValue && element.renderUI === undefined) {
        element.domElement.textContent = element.uiValue; // Если значение простое - указать его в DOM через textContent
        return;
      } else if (element.renderUI !== undefined) {
        element.renderUI(); // Если значение сложное - выполнить метод для отображение элементов (фото или иконки удобств)
        return;
      }
      element.domElement.remove();
    });

    map.append(popup);
  });
};

export {renderOffers};
