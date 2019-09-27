'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70; /*
var DEALS_NEARBY_AMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};
var PRICES = ['500', '1000', '1500'];
var ROOMS = ['1', '2', '3', '4', '5', '6', '7'];
var NOUNS_ROOMS = ['комната', 'комнаты', 'комнат'];
var NOUNS_GUESTS = ['гостей', 'гостя'];
var DESCRIPTION = ['DescriptionOne', 'DescriptionTwo', 'DescriptionTree', 'DescriptionFour'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

function getRandomElementFromArray(arr) {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}

function createRandomLengthArray(arr) {
  var randomArr = [];

  for (var i = 0; i < arr.length; i++) {
    var pushToArr = (Math.round(Math.random()));
    if (pushToArr) {
      randomArr.push(arr[i]);
    }
  }
  return randomArr;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createOffersArray(count) {
  var offerArray = [];

  for (var i = 1; i < count; i++) {
    var randomOffer = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Предложение ' + i,
        address: '600, 350',
        price: getRandomElementFromArray(PRICES),
        type: getRandomElementFromArray(TYPES),
        rooms: getRandomElementFromArray(ROOMS),
        guests: getRandomInRange(1, 51),
        checkin: getRandomElementFromArray(CHECK_TIMES),
        checkout: getRandomElementFromArray(CHECK_TIMES),
        features: createRandomLengthArray(FEATURES),
        description: getRandomElementFromArray(DESCRIPTION),
        photos: createRandomLengthArray(PHOTOS)
      },
      location: {
        x: Math.round(mapPins.offsetWidth * Math.random()),
        y: 130 + Math.round(500 * Math.random())
      }
    };
    offerArray.push(randomOffer);
  }

  return offerArray;
}

function renderPin(offer) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  pinElementImage.src = offer.author.avatar;
  pinElementImage.alt = offer.offer.description;

  pinElement.addEventListener('click', function () {
    showCard(offer);
  });

  return pinElement;
}
/*
function createPins(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPins.appendChild(fragment);
}

function createFeaturesTag(features) {
  var featuresHTMLText = '';
  for (var i = 0; i < features.length; i++) {
    featuresHTMLText = featuresHTMLText + '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
  }

  return featuresHTMLText;
}

function createPhotosHTML(photos) {
  var photosHTMLText = '';
  for (var i = 0; i < photos.length; i++) {
    photosHTMLText = photosHTMLText + '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return photosHTMLText;
}

function declOfNumR(titles, room) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(room % 100 > 4 && room % 100 < 20) ? 2 : cases[(room % 10 < 5) ? room % 10 : 5]];
}


function declOfNumG(titles, guests) {
  var cases = [0, 1, 0];
  return titles[(guests % 100 > 4 && guests % 100 < 20) ? 0 : cases[(guests % 10 < 2) ? guests % 10 : 2]];
}

function showCard(offer) {
  var cardElement = mapCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '¥/ночь';
  cardElement.querySelector('.popup__type').textContent = RUSSIAN_WORDS[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' ' + declOfNumR(NOUNS_ROOMS, offer.offer.rooms) + ' для ' + offer.offer.guests + ' ' + declOfNumG(NOUNS_GUESTS, offer.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = createFeaturesTag(offer.offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = createPhotosHTML(offer.offer.photos);
  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

  map.insertBefore(cardElement, mapFilter);
}

var offers = createOffersArray(DEALS_NEARBY_AMOUNT);

createPins(offers);
showCard(offers[0]); */
var ENTER_KEYCODE = 'Enter';
var NUMPAD_ENTER_KEYCODE = 'NumpadEnter';

var pinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

function activeMap() {
  document.querySelector('.map').classList.remove('map--faded');

  var mapFilters = document.querySelector('.map__filters');

  var selects = mapFilters.querySelectorAll('select');
  var fieldsets = mapFilters.querySelectorAll('fieldset');

  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = false;
  }

  for (var j = 0; i < fieldsets.length; j++) {
    fieldsets[j].disabled = false;
  }
}

function activeFrom() {
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  var fieldsets = adForm.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
}

pinMain.addEventListener('click', function () {
  activeMap();
  activeFrom();
  setCoordMainPin();
});

pinMain.addEventListener('keydown', function (e) {
  if (e.code === ENTER_KEYCODE || NUMPAD_ENTER_KEYCODE) {
    activeMap();
    activeFrom();
  }
});

var PIN_ARROW = 22;

function setCoordMainPin(isDisabled) {
  var pinCoordsX = Math.round(pinMain.offsetLeft + (PIN_WIDTH / 2));
  var pinCoordsY = Math.round(pinMain.offsetTop + PIN_HEIGHT + PIN_ARROW);

  if (isDisabled) {
    pinCoordsX = Math.round(pinMain.offsetLeft + (PIN_WIDTH / 2));
    pinCoordsY = Math.round(pinMain.offsetTop + (PIN_WIDTH / 2));
  }

  inputAddress.value = pinCoordsX + ', ' + pinCoordsY;
}

setCoordMainPin(true);

var MAX_ROOMS = 100;

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

function checkCountRoomsAndPeople() {
  var countRooms = roomNumber.value;
  var countPeople = capacity.value;

  roomNumber.setCustomValidity('');
  capacity.setCustomValidity('');

  if (countPeople === 0 && countRooms !== MAX_ROOMS) {
    roomNumber.setCustomValidity('Необходимо не менее 100 комнат');
  } else if (countRooms === MAX_ROOMS && countPeople !== 0) {
    capacity.setCustomValidity('Только не для гостей');
  } else if (countRooms < countPeople && countPeople !== 0) {
    capacity.setCustomValidity('Кол-ва людей больше чем мест');
  }
}

checkCountRoomsAndPeople();
