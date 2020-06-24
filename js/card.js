'use strict';

(function () {
  var cardContent = {
    setSrcPhotos: function (newCard) {
      var photoCard = newCard.querySelectorAll('.popup__photo');
      for (var k = 0; k < window.util.ADVERTS_PHOTOS.length; k++) {
        photoCard[k].src = window.util.ADVERTS_PHOTOS[k];
      }
    },

    getCreatePhotos: function (newCard) {
      var photoCard = newCard.querySelector('.popup__photo');
      var newPhoto = document.createDocumentFragment();
      for (var k = 0; k < window.util.ADVERTS_PHOTOS.length - 1; k++) {
        var photo = photoCard.cloneNode(true);
        newPhoto.appendChild(photo);
      }
      var photos = newCard.querySelector('.popup__photos').appendChild(newPhoto);
      cardContent.setSrcPhotos(newCard);
      return photos;
    },

    setCreateType: function (container, offerType) {
      if (offerType.length) {
        container.textContent = window.util.typesName[offerType];
      } else {
        container.style.display = 'none';
      }
    },

    getCreateFill: function (advert, text, secondText) {
      var fill = '';
      if (advert.length !== 0) {
        fill = text + advert + secondText;
      } else {
        fill = '';
      }
      return fill;
    },

    setCreateCapacity: function (capacity, advert) {
      capacity.textContent = cardContent.getCreateFill(advert.offer.rooms, '', ' комнаты для ') + cardContent.getCreateFill(advert.offer.guests, '', ' гостей');
      if (capacity.textContent.length === 0) {
        capacity.style.display = 'none';
      }
    },

    setCreateTextTime: function (time, advert) {
      time.textContent = cardContent.getCreateFill(advert.offer.checkin, ' Заезд после ', ', ') + cardContent.getCreateFill(advert.offer.checkout, ' Выезд до ', '');
      if (time.textContent.length === 0) {
        time.style.display = 'none';
      }
    },

    setCreateContent: function (container, data, option, text) {
      if (!data) {
        container.style.display = 'none';
      } else {
        if (option) {
          container.textContent = data;
          return;
        }
        container.innerHTML = data + text;
      }
    },

    setCreateFeatures: function (container, offers) {
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
    }
  };

  var setCreateDescCard = function (advert) {
    var card = document.querySelector('#card').content.cloneNode(true);
    var newCard = card.querySelector('.map__card');
    cardContent.setCreateContent(newCard.querySelector('.popup__title'), advert.offer.title, true);
    cardContent.setCreateContent(newCard.querySelector('.popup__text--address'), advert.offer.address, true);
    cardContent.setCreateContent(newCard.querySelector('.popup__text--price'), advert.offer.price, false, '&#8381;<span>/ночь</span>');
    cardContent.setCreateType(newCard.querySelector('.popup__type'), advert.offer.type);
    cardContent.setCreateCapacity(newCard.querySelector('.popup__text--capacity'), advert);
    cardContent.setCreateTextTime(newCard.querySelector('.popup__text--time'), advert);
    cardContent.setCreateFeatures(newCard.querySelector('.popup__features'), advert.offer.features);
    cardContent.setCreateContent(newCard.querySelector('.popup__description'), advert.offer.description, true);
    cardContent.getCreatePhotos(newCard);
    return card;
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  window.renderCard = function (advert) {
    map.insertBefore(setCreateDescCard(advert), mapFiltersContainer);
  };
})();
