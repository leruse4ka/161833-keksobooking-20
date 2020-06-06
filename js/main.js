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
  var adverts = [];
  for (var i = 0; i < 8; i++) {
    var indexImg = i + 1;
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + indexImg + '.png'
      },
      offer: {
        title: '',
        address: '600, 350',
        price: 0,
        type: ADVERTS_TYPES[0],
        rooms: 0,
        guests: 0,
        checkin: ADVERTS_TIMES[0],
        checkout: ADVERTS_TIMES[0],
        features: ADVERTS_FEATURES[0],
        description: '',
        photos: ADVERTS_PHOTOS[0]
      },
      location: {
        x: getRandomLocationX(mapPins.offsetWidth),
        y: getRandomLocationY(130, 630)
      }
    };
    adverts[i] = advert;
  }
  return adverts;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createPins = function (advertsFunct) {
  var fragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin').content;
  var mapPin = document.querySelector('.map__pin');
  for (var j = 0; j < advertsFunct.length; j++) {
    var newPin = pin.cloneNode(true);
    newPin.querySelector('.map__pin').style.left = advertsFunct[j].location.x + (mapPin.offsetWidth / 2) + 'px';
    newPin.querySelector('.map__pin').style.top = advertsFunct[j].location.y - mapPin.offsetHeight + 'px';
    newPin.querySelector('img').src = advertsFunct[j].author.avatar;
    newPin.querySelector('img').alt = advertsFunct[j].offer.title;
    fragment.appendChild(newPin);
  }
  return fragment;
};

var renderPins = function () {
  var advertsFunct = renderAdverts();
  var newMapPins = createPins(advertsFunct);
  mapPins.appendChild(newMapPins);
};

renderPins();
