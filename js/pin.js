'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
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


  window.renderPins = function (advert) {
    var newMapPins = createPins(advert);
    mapPins.appendChild(newMapPins);
  };

})();
