import {
  makeAdFormActive,
  makeFilterFormActive,
  filtersForm,
  filterRoomsSelect,
  filterGuestsSelect,
  filterTypeSelect,
  filterPriceSelect
} from './form-utils.js';
import {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  OBJECTS_QUANTITY,
  PRICE_RANGE,
} from '../common/params.js';
import {createBalloonContent} from '../offers/render.js';
import {getOffers} from './api.js';
import {onDataError} from './modals.js';
import {debounce} from '../common/utils.js';

const markers = [];

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

const addMarkersToMap = (offersList, limit = OBJECTS_QUANTITY) => {
  Array.from(Array(limit).keys()).forEach((_, index) => {
    const marker = L.marker(
      {
        lat: offersList[index].location.lat,
        lng: offersList[index].location.lng
      },
      {
        draggable: false,
        icon: offersIcon
      }
    );
    markers.push(marker);
    marker.addTo(map).bindPopup(createBalloonContent(offersList[index]));
  });
};

getOffers((offers) => {
  addMarkersToMap(offers);
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

const deleteMarkers = () => {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
};

const getOfferRank = (offer) => {
  let rank = 0;

  if(offer.offer.type === filterTypeSelect.value) {
    rank += 1;
  }

  if(filterPriceSelect.value !== 'any') {
    const priceRange = PRICE_RANGE[(filterPriceSelect.value).toUpperCase()];
    if(offer.offer.price >= priceRange.MIN && offer.price <= priceRange.MAX) {
      rank += 1;
    }
  }

  if(offer.offer.rooms === +filterRoomsSelect.value) {
    rank += 1;
  }

  if(offer.offer.guests === +filterGuestsSelect.value) {
    rank += 1;
  }

  const checkedFeatures = [...document.querySelectorAll('.map__checkbox:checked')].map((element) => element.value);
  if(checkedFeatures.length && offer.offer.features) {
    const commonElements = checkedFeatures.filter((element) => offer.offer.features.includes(element));
    rank += commonElements.length;
  }
  return rank;
};

const checkFilterConditions = (offer) => {
  if(offer.offer.type !== filterTypeSelect.value && filterTypeSelect.value !== 'any') {
    return false;
  }

  if(filterPriceSelect.value !== 'any') {
    const priceRange = PRICE_RANGE[(filterPriceSelect.value).toUpperCase()];
    if(offer.offer.price < priceRange.MIN || offer.offer.price > priceRange.MAX) {
      return false;
    }
  }

  if(offer.offer.rooms !== +filterRoomsSelect.value && filterRoomsSelect.value !== 'any') {
    return false;
  }

  if(offer.offer.guests !== +filterGuestsSelect.value && filterGuestsSelect.value !== 'any') {
    return false;
  }
  return true;
};

const checkFilterFeatures = (offer) => {
  const checkedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));

  if(!checkedFeatures.length) {
    return true;
  }

  if(!offer.offer.features) {
    return false;
  }

  return checkedFeatures.every((feature) => offer.offer.features.includes(feature.value));
};

const compareRank = (first, second) => getOfferRank(second) - getOfferRank(first);

const onFilterChange = () => {
  getOffers((offers) => {
    deleteMarkers();
    const offersToShow = [];
    for(let i = 0; i < offers.length; i++) {
      if(checkFilterConditions(offers[i]) && checkFilterFeatures(offers[i])){
        offersToShow.push(offers[i]);
      }
      if(offersToShow.length === OBJECTS_QUANTITY) {
        break;
      }
    }
    addMarkersToMap(
      offersToShow.slice().sort(compareRank),
      offersToShow.length <= OBJECTS_QUANTITY ? offersToShow.length : OBJECTS_QUANTITY);
  }, () => {
    onDataError();
  });
};

const addFilterChangeListener = () => {
  filtersForm.addEventListener('change', debounce(() => {
    onFilterChange();
  }));
};

export {mainMarker, resetMainMarker, map, markers, addFilterChangeListener};
