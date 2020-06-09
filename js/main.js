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

var getRandomTypes = function () {
  var randomTypesIndex = Math.floor(Math.random() * ADVERTS_TYPES.length);
  return ADVERTS_TYPES[randomTypesIndex];
};

var getRandomTimes = function () {
  var randomTimesIndex = Math.floor(Math.random() * ADVERTS_TIMES.length);
  return ADVERTS_TIMES[randomTimesIndex];
};

var getRandomFeatures = function () {
  var randomFeaturesIndex = Math.floor(Math.random() * ADVERTS_FEATURES.length);
  var randomFeatures = [];
  for (var i = 0; i < randomFeaturesIndex; i++) {
    randomFeatures[i] = ADVERTS_FEATURES[i];
  }
  return randomFeatures;
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
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 5200,
        type: getRandomTypes(),
        rooms: 5,
        guests: 10,
        checkin: getRandomTimes(),
        checkout: getRandomTimes(),
        features: getRandomFeatures(),
        description: 'Описание',
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

var getOfferType = function (advert) {
  if (advert.offer.type === 'flat') {
    return 'Квартира';
  } else if (advert.offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (advert.offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
};

var getSrcPhotos = function (newCard) {
  var photoCard = newCard.querySelectorAll('.popup__photo');
  for (var k = 0; k < ADVERTS_PHOTOS.length; k++) {
    photoCard[k].src = ADVERTS_PHOTOS[k];
  }
};

var createPhoto = function (newCard) {
  var photoCard = newCard.querySelector('.popup__photo');
  var newPhoto = document.createDocumentFragment();
  for (var k = 0; k < ADVERTS_PHOTOS.length - 1; k++) {
    var photo = photoCard.cloneNode(true);
    newPhoto.appendChild(photo);
  }
  var photos = newCard.querySelector('.popup__photos').appendChild(newPhoto);
  getSrcPhotos(newCard);
  return photos;
};

var getCardFeatures = function (newCard, advert) {
  var card = advert[0].offer.features;
  var cards = newCard.querySelectorAll('.popup__feature');
  for (var i = 0; i < card.length; i++) {
    var offer = card[i];
    for (var k = 0; k < card.length; k++) {
      if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else if (offer === ADVERTS_FEATURES[k]) {
        cards[k].textContent = ADVERTS_FEATURES[k];
      } else {
        cards[k].style.display = 'none';
      }
    }
  }
};

var getCreateTitle = function (newCard, advert) {
  var offerTitle = advert[0].offer.title;
  if (offerTitle.length !== 0) {
    newCard.querySelector('.popup__title').textContent = offerTitle;
  } else {
    newCard.querySelector('.popup__title').style.display = 'none';
  }
};

var getCreateAddress = function (newCard, advert) {
  var offerAddress = advert[0].offer.address;
  if (offerAddress.length !== 0) {
    newCard.querySelector('.popup__text--address').textContent = offerAddress;
  } else {
    newCard.querySelector('.popup__text--address').style.display = 'none';
  }
};

var getCreatePrice = function (newCard, advert) {
  var offerPrice = advert[0].offer.price;
  if (offerPrice.length !== 0) {
    newCard.querySelector('.popup__text--price').textContent = offerPrice + '₽/ночь';
  } else {
    newCard.querySelector('.popup__text--price').style.display = 'none';
  }
};

var getCreateType = function (newCard, advert) {
  var offerType = advert[0].offer.type;
  if (offerType.length !== 0) {
    newCard.querySelector('.popup__type').textContent = getOfferType(advert[0]);
  } else {
    newCard.querySelector('.popup__type').style.display = 'none';
  }
};

var getCreateRooms = function (advert) {
  var offerRooms = advert[0].offer.rooms;
  var rooms = '';
  if (offerRooms.length !== 0) {
    rooms = offerRooms + ' комнаты для ';
  } else {
    rooms = '';
  }
  return rooms;
};

var getCreateGuests = function (advert) {
  var offerGuests = advert[0].offer.guests;
  var guests = '';
  if (offerGuests.length !== 0) {
    guests = offerGuests + ' гостей';
  } else {
    guests = '';
  }
  return guests;
};

var getCreateCheckin = function (advert) {
  var offerCheckin = advert[0].offer.checkin;
  var checkin = '';
  if (offerCheckin.length !== 0) {
    checkin = 'Заезд после ' + offerCheckin + ', ';
  } else {
    checkin = '';
  }
  return checkin;
};

var getCreateCheckout = function (advert) {
  var offerCheckout = advert[0].offer.checkout;
  var checkout = '';
  if (offerCheckout.length !== 0) {
    checkout = 'выезд до ' + offerCheckout;
  } else {
    checkout = '';
  }
  return checkout;
};

var getCreateCapacity = function (newCard, advert) {
  var capacity = newCard.querySelector('.popup__text--capacity');
  capacity.textContent = getCreateRooms(advert) + getCreateGuests(advert);
  if (capacity.textContent.length === 0) {
    capacity.style.display = 'none';
  }
};

var getCreateTextTime = function (newCard, advert) {
  var time = newCard.querySelector('.popup__text--time');
  time.textContent = getCreateCheckin(advert) + getCreateCheckout(advert);
  if (time.textContent.length === 0) {
    time.style.display = 'none';
  }
};

var getCreateDescription = function (newCard, advert) {
  var description = newCard.querySelector('.popup__description');
  description.textContent = advert[0].offer.description;
  if (description.textContent.length === 0) {
    description.style.display = 'none';
  }
};

var getCreateDescCard = function (advert) {
  var newCard = document.querySelector('.map__card');
  getCreateTitle(newCard, advert);
  getCreateAddress(newCard, advert);
  getCreatePrice(newCard, advert);
  getCreateType(newCard, advert);
  getCreateCapacity(newCard, advert);
  getCreateTextTime(newCard, advert);
  getCardFeatures(newCard, advert);
  getCreateDescription(newCard, advert);
  createPhoto(newCard);
};

var renderCard = function (advert) {
  var card = document.querySelector('#card').content;
  var newCard = card.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  map.insertBefore(newCard, mapFiltersContainer);
  getCreateDescCard(advert);
};

renderCard(adverts);
