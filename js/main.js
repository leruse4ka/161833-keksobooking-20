'use strict';

(function () {

  var map = document.querySelector('.map');

  var notice = document.querySelector('.notice');

  var mapPinMain = document.querySelector('.map__pin--main');

  var noActivePage = function () {
    window.formValidation.setAddress(false);
    window.formValidation.setStatus(notice.querySelectorAll('fieldset'), false);
    window.formValidation.setStatus(map.querySelectorAll('select'), false);
    map.querySelector('.map__filters').classList.add('map__filters--disabled');
  };

  noActivePage();

  var selectRoom = notice.querySelector('#room_number');
  var timeIn = notice.querySelector('#timein');

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var mainPinClichHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      var room = selectRoom.options.selectedIndex;
      var time = timeIn.options.selectedIndex;
      map.classList.remove('map--faded');
      window.formValidation.setStatus(notice.querySelectorAll('fieldset'), true);
      window.formValidation.setStatus(map.querySelectorAll('select'), true);
      map.querySelector('.map__filters').classList.remove('map__filters--disabled');
      notice.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.load(window.renderPins, errorHandler);
      window.formValidation.setAddress(true);
      window.formValidation.checkRooms(selectRoom.options[room].value);
      window.formValidation.checkType();
      window.formValidation.checkTimes(time);
      mapPinMain.removeEventListener('mousedown', mainPinClichHandler);
      mapPinMain.removeEventListener('keydown', mainPinClichHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mainPinClichHandler);

  mapPinMain.addEventListener('keydown', mainPinClichHandler);


})();
