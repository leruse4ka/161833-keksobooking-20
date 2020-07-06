'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var widthMapCoords = map.offsetLeft + map.offsetWidth;

      if (moveEvt.clientX < map.offsetLeft) {
        mapPinMain.style.left = (window.util.MIN_LEFT_COORDS - window.util.MAP_PIN_MAIN_WIDTH / 2) + 'px';
      } else if (moveEvt.clientX > widthMapCoords) {
        mapPinMain.style.left = (map.offsetWidth - window.util.MAP_PIN_MAIN_WIDTH / 2) + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (moveEvt.clientY < window.util.MIN_TOP_COORDS) {
        mapPinMain.style.top = (window.util.MIN_TOP_COORDS - window.util.MAP_PIN_MAIN_HEIGHT_END) + 'px';
      } else if (moveEvt.clientY > window.util.MAX_TOP_COORDS) {
        mapPinMain.style.top = (window.util.MAX_TOP_COORDS - window.util.MAP_PIN_MAIN_HEIGHT_END) + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.formValidation.setAddress(true);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
