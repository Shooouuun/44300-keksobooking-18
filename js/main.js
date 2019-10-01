'use strict';

var ENTER_KEYCODE = 'Enter';

var DEALS_NEARBY_AMOUNT = 8;

var PIN_WIDTH = 65;
var PIN_HEIGHT = 65;
var PIN_ARROW = 22;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

var PRICE_MIN = 100;
var PRICE_MAX = 1500;

var ADDRESS_MIN = 100;
var ADDRESS_MAX = 600;

var ROOMS_MIN = 1;
var ROOMS_MAX = 4;

var GUESTS_MIN = 1;
var GUESTS_MAX = 4;

var MAX_ROOMS = 100;
var NOUNS_ROOMS = ['комната', 'комнаты', 'комнат'];
var NOUNS_GUESTS = ['гостей', 'гостя'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var pinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

var mapFilters = document.querySelector('.map__filters');
var filterstChild = document.querySelector('.map__filters').children;
var adForm = document.querySelector('.ad-form');
var formChild = document.querySelector('.ad-form').children;

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

/**
* @function getRandomValueInRange Генерирует случайное целое  число.
* @param {number} min - The min value.
* @param {number} max - The max value.
* @returns {number} random value.
*/

function getRandomValueInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
* @function createRandomLengthArray Генерирует массив случайной длины.
* @param {string} arr - array.
* @returns {string} randomArr - random length array.
*/

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

/**
* @function generateMockData генерирует массив со случайными данными в объектах.
* @param {number} quantity - количество генерируемых случайных объектов в массиве.
* @returns {string} mockList - сгенерированный массив объектов.
*/

function generateMockData(quantity) {
  var mockList = [];
  for (var i = 1; i < quantity; i++) {
    var randomMock = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Предложение ' + i,
        address: getRandomValueInRange(ADDRESS_MIN, ADDRESS_MAX) + ', ' + getRandomValueInRange(ADDRESS_MIN, ADDRESS_MAX),
        price: getRandomValueInRange(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomValueInRange(0, TYPES.length - 1)],
        rooms: getRandomValueInRange(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomValueInRange(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECK_TIMES[getRandomValueInRange(0, CHECK_TIMES.length - 1)],
        checkout: CHECK_TIMES[getRandomValueInRange(0, CHECK_TIMES.length - 1)],
        features: createRandomLengthArray(FEATURES),
        description: 'Description ' + i,
        photos: createRandomLengthArray(PHOTOS)
      },
      location: {
        x: Math.round(mapPins.offsetWidth * Math.random()),
        y: 130 + Math.round(500 * Math.random())
      }
    };
    mockList.push(randomMock);
  }
  return mockList;
}

var mockData = generateMockData(DEALS_NEARBY_AMOUNT);

function renderPin(quantity) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (quantity.location.x - PIN_WIDTH / 2) + 'px; top: ' + (quantity.location.y - PIN_HEIGHT) + 'px;';
  pinElementImage.src = quantity.author.avatar;
  pinElementImage.alt = quantity.offer.description;

  pinElement.addEventListener('click', function () {
    showCard(quantity);
  });
  return pinElement;
}

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

function disabledAttribute(filters, form) {
  for (var i = 0; i < filters.length; i++) {
    filters[i].disabled = true;
  }

  for (var j = 0; j < form.length; j++) {
    form[j].disabled = true;
  }
}

disabledAttribute(filterstChild, formChild);


function activeMap() {
  document.querySelector('.map').classList.remove('map--faded');

  var selects = mapFilters.querySelectorAll('select');
  var fieldsets = mapFilters.querySelectorAll('fieldset');

  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = false;
  }

  for (var j = 0; j < fieldsets.length; j++) {
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
};

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
    capacity.setCustomValidity('Кол-во людей больше чем мест');
  }
}

pinMain.addEventListener('mousedown', function () {
  activeMap();
  activeFrom();
  setCoordMainPin();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE) {
    activeMap();
    activeFrom();
  }
});

roomNumber.addEventListener('change', function () {
  checkCountRoomsAndPeople();
});
capacity.addEventListener('change', function () {
  checkCountRoomsAndPeople();
});

setCoordMainPin(true);
checkCountRoomsAndPeople();
