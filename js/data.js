'use strict';

(function () {
  window.renderAdverts = function () {
    var mapPins = document.querySelector('.map__pins');
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
          price: window.random.getRandomNumber(1000, 10000),
          type: window.random.getRandomValue(window.util.ADVERTS_TYPES),
          rooms: window.random.getRandomNumber(1, 10),
          guests: window.random.getRandomNumber(1, 10),
          checkin: window.random.getRandomValue(window.util.ADVERTS_TIMES),
          checkout: window.random.getRandomValue(window.util.ADVERTS_TIMES),
          features: window.random.getRandomFeatures(),
          description: 'Описание',
          photos: window.util.ADVERTS_PHOTOS
        },
        location: {
          x: window.random.getRandomNumber(0, mapPins.offsetWidth),
          y: window.random.getRandomNumber(130, 630)
        }
      };
      advertsAll[i] = advert;
    }
    return advertsAll;
  };
})();
