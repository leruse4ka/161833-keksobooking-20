'use strict';

var ADVERTS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERTS_TIMES = ['12:00', '13:00', '14:00'];
var ADVERTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPins = document.querySelector('.map__pins');

var getRandomLocationX = function (max) {
  var randomLocationX = Math.floor(Math.random() * max);
  return randomLocationX;
};

var getRandomLocationY = function (min, max) {
  var randomLocationY = Math.floor(Math.random() * (max - min) + min);
  return randomLocationY;
};

var renderAdverts = function () {
  var advertsAll = [];
  for (var i = 0; i < 8; i++) {
    var indexImg = i + 1;
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + indexImg + '.png'
      },
      offer: {
        title: 'заголовок предложения',
        address: '600, 350',
        price: 0,
        type: ADVERTS_TYPES[0],
        rooms: 0,
        guests: 0,
        checkin: ADVERTS_TIMES[0],
        checkout: ADVERTS_TIMES[0],
        features: ADVERTS_FEATURES[0],
        description: '',
        photos: ADVERTS_PHOTOS
      },
      location: {
        x: getRandomLocationX(mapPins.offsetWidth),
        y: getRandomLocationY(130, 630)
      }
    };
    advertsAll[i] = advert;
  }
  return advertsAll;
};

var adverts = renderAdverts();
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createPin = function () {
  var pinFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin').content;
  var newPin = pin.cloneNode(true);
  pinFragment.appendChild(newPin);
  return pinFragment;
};

var createPins = function (advert) {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pin');
  for (var j = 0; j < advert.length; j++) {
    var pin = createPin();
    pin.querySelector('.map__pin').style.left = advert[j].location.x + (mapPin.offsetWidth / 2) + 'px';
    pin.querySelector('.map__pin').style.top = advert[j].location.y - mapPin.offsetHeight + 'px';
    pin.querySelector('img').src = advert[j].author.avatar;
    pin.querySelector('img').alt = advert[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};


var renderPins = function (advert) {
  var newMapPins = createPins(advert);
  mapPins.appendChild(newMapPins);
};

renderPins(adverts);
