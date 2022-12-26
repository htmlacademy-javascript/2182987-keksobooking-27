import {makeAdFormActive, makeFilterFormActive} from './form-utils.js';
import {DEFAULT_COORDINATES, DEFAULT_ZOOM} from '../common/params.js';
import {createBalloonContent} from '../offers/render.js';
import {getOffers} from './api.js';
import {onDataError} from './modals.js';

// Иницализация работы с координарами (Leaflet)
const map = L.map('map-canvas')
  .on('load', () => {
    makeAdFormActive();
    makeFilterFormActive();
  })
  .setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

// Иницализация работы карты (OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Параметры иконки объявлений
const offersIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

// Параметры иконки управления полем локации
const pinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

getOffers((offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng
      },
      {
        draggable: false,
        icon: offersIcon
      }
    );
    marker.addTo(map).bindPopup(createBalloonContent(offer));
  });
}, () => {
  onDataError();
});

// Параметры основной метки
const mainMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: pinIcon
  }
);

// Сброс метки до изначального положения
const resetMainMarker = () => {
  mainMarker.setLatLng(DEFAULT_COORDINATES);
  map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);
  map.closePopup();
};

mainMarker.addTo(map);

export {mainMarker, resetMainMarker};
