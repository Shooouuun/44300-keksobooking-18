'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var COUNT = 8;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_DICTIONARY = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PRICE_FOR_TYPE = {'palace': 10000, 'flat': 1000, 'house': 5000, 'bungalo': 0};

var ADDRESS_MIN = 100;
var ADDRESS_MAX = 600;
var PRICE_MIN = 100;
var PRICE_MAX = 1000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 4;

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGNT = 65;

var MAIN_PIN_ARROW_HEIGNT = 22;

var MAP_WIDTH = document.querySelector('.map').offsetWidth;

var PATH_TO_PHOTO = 'http://o0.github.io/assets/images/tokyo/hotel';

var MAX_ROOMS = 100;

var pinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var houseType = document.querySelector('#type');
var price = document.querySelector('#price');

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getFeatures = function (features) {
  var countFeatures = getRandomInt(1, features.length - 1);
  var featuresList = [];
  for (var i = 0; i < countFeatures; i++) {
    featuresList.push(features[getRandomInt(0, features.length - 1)]);
  }

  return featuresList;
};

var getPhotos = function () {
  var countPhotos = getRandomInt(1, 10);
  var photosList = [];
  for (var i = 0; i < countPhotos; i++) {
    photosList.push(PATH_TO_PHOTO + getRandomInt(1, 3) + '.jpg');
  }

  return photosList;
};

var generateMockData = function () {
  var mockList = [];
  for (var i = 1; i <= COUNT; i++) {
    var mock = {
      avatar: 'img/avatars/user0' + i + '.png',
      offer: {
        title: 'Заголовок ' + i,
        address: getRandomInt(ADDRESS_MIN, ADDRESS_MAX) + ', ' + getRandomInt(ADDRESS_MIN, ADDRESS_MAX),
        price: getRandomInt(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomInt(0, TYPES.length - 1)],
        rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[getRandomInt(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomInt(0, CHECKIN.length - 1)],
        features: getFeatures(FEATURES),
        description: 'Описание' + i,
        photos: getPhotos()
      },
      location: {
        x: getRandomInt(0, MAP_WIDTH),
        y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
    mockList.push(mock);
  }

  return mockList;
};

var mockData = generateMockData();

// Активация Карты
var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');

  var mapFilters = document.querySelector('.map__filters');

  var selects = mapFilters.querySelectorAll('select');
  var fieldsets = mapFilters.querySelectorAll('fieldset');
  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = false;
  }
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = false;
  }
};

// Активация формы
var activateForm = function () {
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  var fieldsets = adForm.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
};

// Установка координат для главной точки
var setCoordMainPin = function (isDisabled) {
  var pinCoordsX = Math.round(pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2));
  var pinCoordsY = Math.round(pinMain.offsetTop + MAIN_PIN_HEIGNT + MAIN_PIN_ARROW_HEIGNT);

  if (isDisabled) {
    pinCoordsX = Math.round(pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2));
    pinCoordsY = Math.round(pinMain.offsetTop + (MAIN_PIN_HEIGNT / 2));
  }

  inputAddress.value = pinCoordsX + ', ' + pinCoordsY;
};


var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var cardTemplate = document.querySelector('#card').content.querySelector('article');

var fillPinTemplate = function (data) {
  var template = pinTemplate.cloneNode(true);

  template.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
  template.style.top = (data.location.y - PIN_HEIGHT) + 'px';

  template.querySelector('img').src = data.avatar;
  template.querySelector('img').alt = data.offer.title;

  return template;
};

var renderPins = function (mock) {
  var pinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mock.length; i++) {
    var pin = fillPinTemplate(mock[i]);
    fragment.appendChild(pin);
  }
  pinsList.appendChild(fragment);
};

// Личный проект: больше деталей
var fillTemplateCard = function (data) {
  var offer = data.offer;
  var avatar = data.avatar;
  var template = cardTemplate.cloneNode(true);

  template.querySelector('.popup__title').textContent = offer.title;
  template.querySelector('.popup__text--address').textContent = offer.address;
  template.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  template.querySelector('.popup__type').textContent = TYPES_DICTIONARY[offer.type];
  template.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  template.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  var fragmentFeatures = document.createDocumentFragment();
  for (var indexFeature = 0; indexFeature < offer.features.length; indexFeature++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + offer.features[indexFeature]);
    fragmentFeatures.appendChild(li);
  }
  template.querySelector('.popup__features').innerHTML = '';
  template.querySelector('.popup__features').appendChild(fragmentFeatures);

  template.querySelector('.popup__description').textContent = offer.description;

  var fragmentPhoto = document.createDocumentFragment();
  for (var indexPhoto = 0; indexPhoto < offer.photos.length; indexPhoto++) {
    var img = document.createElement('img');
    img.src = offer.photos[indexPhoto];
    img.classList.add('popup__photo');
    img.width = '45';
    img.height = '40';
    img.alt = 'Фотография жилья';
    fragmentPhoto.appendChild(img);
  }
  template.querySelector('.popup__photos').innerHTML = '';
  template.querySelector('.popup__photos').appendChild(fragmentPhoto);

  template.querySelector('.popup__avatar').src = avatar;

  return template;
};

var insertTemplateCard = function (template) {
  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', template);
};

// Провоерка соответсвия «Количество комнат» и «Количество мест»
var checkCountRoomsAndPeople = function () {
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
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup();
  }
};

var openPopupHandler = function (pin, data) {
  pin.addEventListener('click', function () {
    openPopup(data);
  });
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(data);
    }
  });
};

var openPopup = function (data) {
  var popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }

  var template = fillTemplateCard(data);
  insertTemplateCard(template);
  document.addEventListener('keydown', onPopupEscPress);
  closePopupHandler();
};

var closePopupHandler = function () {
  var closePopup = document.querySelector('.popup__close');
  closePopup.addEventListener('click', function () {
    removePopup();
  });
};

var removePopup = function () {
  var popup = document.querySelector('.popup');
  popup.remove();
  document.removeEventListener('keydown', onPopupEscPress);
};

var syncTime = function (time) {
  timeIn.value = time.value;
  timeOut.value = time.value;
};

// События Активации карты
pinMain.addEventListener('mousedown', function () {
  init();
});
pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    init();
  }
});

// События валидации «Количество комнат» и «Количество мест»
roomNumber.addEventListener('change', function () {
  checkCountRoomsAndPeople();
});
capacity.addEventListener('change', function () {
  checkCountRoomsAndPeople();
});

houseType.addEventListener('change', function () {
  price.setAttribute('min', PRICE_FOR_TYPE[houseType.value]);
  price.placeholder = PRICE_FOR_TYPE[houseType.value];
});

timeIn.addEventListener('change', function () {
  syncTime(timeIn);
});
timeOut.addEventListener('change', function () {
  syncTime(timeOut);
});

var init = function () {
  activateMap();
  setCoordMainPin();
  renderPins(mockData);
  activateForm();

  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    openPopupHandler(pins[i], mockData[i]);
  }
};

setCoordMainPin(true);
checkCountRoomsAndPeople();
