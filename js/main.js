'use strict';

var ADVERTS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var typesName = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ADVERTS_TIMES = ['12:00', '13:00', '14:00'];
var ADVERTS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERTS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPins = document.querySelector('.map__pins');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
};

var getRandomValue = function (name) {
  var randomIndex = Math.floor(Math.random() * name.length);
  return name[randomIndex];
};

var getRandomFeatures = function () {
  var randomFeaturesIndex = getRandomNumber(0, ADVERTS_FEATURES.length);
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
        price: getRandomNumber(1000, 10000),
        type: getRandomValue(ADVERTS_TYPES),
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 10),
        checkin: getRandomValue(ADVERTS_TIMES),
        checkout: getRandomValue(ADVERTS_TIMES),
        features: getRandomFeatures(),
        description: 'Описание',
        photos: ADVERTS_PHOTOS
      },
      location: {
        x: getRandomNumber(0, mapPins.offsetWidth),
        y: getRandomNumber(130, 630)
      }
    };
    advertsAll[i] = advert;
  }
  return advertsAll;
};

var adverts = renderAdverts();
var map = document.querySelector('.map');

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

var setSrcPhotos = function (newCard) {
  var photoCard = newCard.querySelectorAll('.popup__photo');
  for (var k = 0; k < ADVERTS_PHOTOS.length; k++) {
    photoCard[k].src = ADVERTS_PHOTOS[k];
  }
};

var getCreatePhotos = function (newCard) {
  var photoCard = newCard.querySelector('.popup__photo');
  var newPhoto = document.createDocumentFragment();
  for (var k = 0; k < ADVERTS_PHOTOS.length - 1; k++) {
    var photo = photoCard.cloneNode(true);
    newPhoto.appendChild(photo);
  }
  var photos = newCard.querySelector('.popup__photos').appendChild(newPhoto);
  setSrcPhotos(newCard);
  return photos;
};

var setCreateType = function (container, offerType) {
  if (offerType.length) {
    container.textContent = typesName[offerType];
  } else {
    container.style.display = 'none';
  }
};

var getCreateFill = function (advert, text, secondText) {
  var fill = '';
  if (advert.length !== 0) {
    fill = text + advert + secondText;
  } else {
    fill = '';
  }
  return fill;
};

var setCreateCapacity = function (capacity, advert) {
  capacity.textContent = getCreateFill(advert.offer.rooms, '', ' комнаты для ') + getCreateFill(advert.offer.guests, '', ' гостей');
  if (capacity.textContent.length === 0) {
    capacity.style.display = 'none';
  }
};

var setCreateTextTime = function (time, advert) {
  time.textContent = getCreateFill(advert.offer.checkin, ' Заезд после ', ', ') + getCreateFill(advert.offer.checkout, ' Выезд до ', '');
  if (time.textContent.length === 0) {
    time.style.display = 'none';
  }
};

var setCreateContent = function (container, data, option, text) {
  if (!data) {
    container.style.display = 'none';
  } else {
    if (option) {
      container.textContent = data;
      return;
    }
    container.innerHTML = data + text;
  }
};

var setCreateFeatures = function (container, offers) {
  container.innerHTML = '';
  if (!offers.length) {
    container.style.display = 'none';
    return;
  }
  offers.forEach(function (offer) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + offer);
    container.appendChild(li);
  });
};

var setCreateDescCard = function (advert) {
  var card = document.querySelector('#card').content.cloneNode(true);
  var newCard = card.querySelector('.map__card');
  setCreateContent(newCard.querySelector('.popup__title'), advert.offer.title, true);
  setCreateContent(newCard.querySelector('.popup__text--address'), advert.offer.address, true);
  setCreateContent(newCard.querySelector('.popup__text--price'), advert.offer.price, false, '&#8381;<span>/ночь</span>');
  setCreateType(newCard.querySelector('.popup__type'), advert.offer.type);
  setCreateCapacity(newCard.querySelector('.popup__text--capacity'), advert);
  setCreateTextTime(newCard.querySelector('.popup__text--time'), advert);
  setCreateFeatures(newCard.querySelector('.popup__features'), advert.offer.features);
  setCreateContent(newCard.querySelector('.popup__description'), advert.offer.description, true);
  getCreatePhotos(newCard);
  return card;
};

var mapFiltersContainer = document.querySelector('.map__filters-container');

var renderCard = function (advert) {
  map.insertBefore(setCreateDescCard(advert), mapFiltersContainer);
};

//renderCard(adverts[0]);//убрать

var notice = document.querySelector('.notice');

var setStatus = function (status, active) {
  if (active) {
    status.forEach(function (activeItem) {
      activeItem.removeAttribute('disabled', 'disabled');
    });
    return;
  } else {
    status.forEach(function (disabledItem) {
      disabledItem.setAttribute('disabled', 'disabled');
    });
    return;
  }
};

var mapPinMain = document.querySelector('.map__pin--main');
var selectRoom = notice.querySelector('#room_number');
var selectCapacity = notice.querySelector('#capacity');

var setAddress = function (active) {
  var box = mapPinMain.getBoundingClientRect();
  notice.querySelector('#address').setAttribute('disabled', 'disabled');
  if (active) {
    var top = box.top + box.height;
  } else {
    top = box.top + (box.height / 2);
  }
  var left = box.left + (box.width / 2);
  notice.querySelector('#address').value = top + ', ' + left;
};

var noActivePage = function () {
  setAddress(false);
  setStatus(notice.querySelectorAll('fieldset'), false);
  setStatus(map.querySelectorAll('select'), false);
  map.querySelector('.map__filters').classList.add('map__filters--disabled');
};

noActivePage();

var activePage = function () {
  var room = selectRoom.options.selectedIndex;
  map.classList.remove('map--faded');
  setStatus(notice.querySelectorAll('fieldset'), true);
  setStatus(map.querySelectorAll('select'), true);
  map.querySelector('.map__filters').classList.remove('map__filters--disabled');
  notice.querySelector('.ad-form').classList.remove('ad-form--disabled');
  renderPins(adverts);
  setAddress(true);
  checkRooms(selectRoom.options[room].value);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activePage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activePage();
  }
});

var roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var checkRooms = function (rooms) {
  var capacityOptions = selectCapacity.querySelectorAll('option');

  capacityOptions.forEach(function (option) {
    option.disabled = true;
  });

  roomValues[rooms].forEach(function (amountGuests) {
    capacityOptions.forEach(function (option) {
      if (Number(option.value) === amountGuests) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

selectRoom.addEventListener('change', function(evt) {
  var target = evt.target;
  checkRooms(target.value);
});

