'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var getCreatePhotos = function (newCard, adverts) {
    var photoCard = newCard.querySelector('.popup__photo');
    var newPhoto = document.createDocumentFragment();
    var photos = newCard.querySelector('.popup__photos');
    if (adverts.length) {
      photos.innerHTML = '';
      adverts.forEach(function (advert) {
        var photo = photoCard.cloneNode(true);
        photo.src = advert;
        newPhoto.appendChild(photo);
      });
      photos.appendChild(newPhoto);
    } else {
      newCard.querySelector('.popup__photos').style.display = 'none';
    }
    return photos;
  };

  var setCreateType = function (container, offerType) {
    if (offerType.length) {
      container.textContent = window.util.typesName[offerType];
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

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    card.remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.util.ESCAPE) {
      evt.preventDefault();
      closeCard();
    }
  };

  var setCreateDescCard = function (advert) {
    var card = document.querySelector('#card').content.cloneNode(true);
    var newCard = card.querySelector('.map__card');
    newCard.querySelector('.popup__avatar').src = advert.author.avatar;
    setCreateContent(newCard.querySelector('.popup__title'), advert.offer.title, true);
    setCreateContent(newCard.querySelector('.popup__text--address'), advert.offer.address, true);
    setCreateContent(newCard.querySelector('.popup__text--price'), advert.offer.price, false, '&#8381;<span>/ночь</span>');
    setCreateType(newCard.querySelector('.popup__type'), advert.offer.type);
    setCreateCapacity(newCard.querySelector('.popup__text--capacity'), advert);
    setCreateTextTime(newCard.querySelector('.popup__text--time'), advert);
    setCreateFeatures(newCard.querySelector('.popup__features'), advert.offer.features);
    setCreateContent(newCard.querySelector('.popup__description'), advert.offer.description, true);
    getCreatePhotos(newCard, advert.offer.photos);

    newCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  var renderCard = function (advert) {
    map.insertBefore(setCreateDescCard(advert), mapFiltersContainer);
  };

  window.card = {
    renderCard: renderCard,
    closeCard: closeCard
  };
})();
