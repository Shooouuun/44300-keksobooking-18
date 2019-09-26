'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var DEALS_NEARBY_AMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RUSSIAN_WORDS = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};
var PRICES = ['500', '1000', '1500'];
var ROOMS = ['1', '2', '3', '4'];
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
map.classList.remove('map--faded');
var mapFilter = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// случайный элемент из массива
function getRandomElementFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// массив случайный длины
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

// получаем массив случайных предложений
function createOffersArray(count) {
  var offerArray = [];

  for (var i = 1; i < count; i++) {
    var randomOffer = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'title ' + i,
        address: '600, 350',
        price: getRandomElementFromArray(PRICES),
        type: getRandomElementFromArray(TYPES),
        rooms: getRandomElementFromArray(ROOMS),
        guests: getRandomInRange(1, 10),
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

// реднер пина
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

// размещение пина на холсте
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


function showCard(offer) {
  var cardElement = mapCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '¥/ночь';
  cardElement.querySelector('.popup__type').textContent = RUSSIAN_WORDS[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = createFeaturesTag(offer.offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = createPhotosHTML(offer.offer.photos);
  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

  map.insertBefore(cardElement, mapFilter);
}

var offers = createOffersArray(DEALS_NEARBY_AMOUNT);
createPins(offers);
showCard(offers[0]);
