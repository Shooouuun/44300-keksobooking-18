'use strict';

var DEALS_NEARBY_AMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

function getRandomElementFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomLengthArray(arr) {
  var randomArr = [];

  for (var i = 0; i < arr.length - 1; i++) {
    var pushToArr = (Math.round(Math.random()));
    if (pushToArr) {
      randomArr.push(arr[i]);
    }
  }
  return randomArr;
}

function createDealsArray(count) {
  var dealsArray = [];

  for (var i = 1; i < count; i++) {
    var randomDeal = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Title',
        address: '600, 350',
        price: 1000,
        type: getRandomElementFromArray(TYPES),
        rooms: 4,
        guests: 5,
        checkin: getRandomElementFromArray(CHECK_TIMES),
        checkout: getRandomElementFromArray(CHECK_TIMES),
        features: createRandomLengthArray(FEATURES),
        description: 'description',
        photos: createRandomLengthArray(PHOTOS)
      },
      location: {
        x: Math.round(mapPins.offsetWidth * Math.random()),
        y: 130 + Math.round(500 * Math.random())
      }
    };
    dealsArray.push(randomDeal);
  }

  return dealsArray;
}

function renderPin(deal) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (deal.location.x - 25) + 'px; top: ' + (deal.location.y - 70) + 'px;';
  pinElementImage.src = deal.author.avatar;
  pinElementImage.alt = deal.offer.description;

  return pinElement;
}

function createPins(arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPins.appendChild(fragment);
}

var deals = createDealsArray(DEALS_NEARBY_AMOUNT);
createPins(deals);
