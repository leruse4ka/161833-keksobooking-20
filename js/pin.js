'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  var createPin = function (data) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPin = document.querySelector('.map__pin');
    var newPin = pin.cloneNode(true);

    newPin.style.left = data.location.x + (mapPin.offsetWidth / 2) + 'px';
    newPin.style.top = data.location.y - mapPin.offsetHeight + 'px';
    newPin.querySelector('img').src = data.author.avatar;
    newPin.querySelector('img').alt = data.offer.title;

    newPin.addEventListener('click', function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
      window.renderCard(data);

    });

    newPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.renderCard(data);
      }
    });

    return newPin;
  };


  var renderPins = function (advert) {
    var mapPinsNotMain = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsNotMain.forEach(function (pin) {
      pin.remove();
    });
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    advert.forEach(function (pin) {
      mapPins.appendChild(createPin(pin));
    });
  };

  window.renderPins = renderPins;

})();

