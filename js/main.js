'use strict';

(function () {

  var map = document.querySelector('.map');

  var notice = document.querySelector('.notice');

  var mapPinMain = document.querySelector('.map__pin--main');

  var noActiveForm = function () {
    window.formValidation.setAddress(false);
    window.formValidation.setStatus(notice.querySelectorAll('fieldset'), false);
    window.formValidation.setStatus(map.querySelectorAll('select'), false);
    map.querySelector('.map__filters').classList.add('map__filters--disabled');
  };

  noActiveForm();

  var noActivePage = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    noActiveForm();
    map.classList.add('map--faded');
    notice.querySelector('.ad-form').classList.add('ad-form--disabled');

    mapPins.forEach(function (pin) {
      pin.remove();
    });

    mapPinMain.style.top = window.util.MAP_PIN_MAIN_START_COORDS_Y + 'px';
    mapPinMain.style.left = window.util.MAP_PIN_MAIN_START_COORDS_X + 'px';

    mapPinMain.addEventListener('mousedown', mainPinClichHandler);

    mapPinMain.addEventListener('keydown', mainPinClichHandler);
  };

  var selectRoom = notice.querySelector('#room_number');
  var timeIn = notice.querySelector('#timein');
  var formResetButton = document.querySelector('.ad-form__reset');

  var formResetClickHandler = function (evt) {
    evt.preventDefault();
    noActivePage();

    formResetButton.removeEventListener('click', formResetClickHandler);
  };

  var pins = [];
  var housingType = 'any';
  var mapForm = document.querySelector('.map__filters');
  var housingTypeInput = mapForm.querySelector('#housing-type');

  var updatePins = function () {
    var sameTypesPins = pins.filter(function (it) {
      if (housingType === 'any') {
        return it;
      } else {
        return it.offer.type === housingType;
      }
    });

    window.renderPins(sameTypesPins);
  };

  housingTypeInput.addEventListener('change', function (evt) {
    var target = evt.target;
    housingType = target.value;

    updatePins();
  });

  var successHandler = function (data) {
    pins = data;
    updatePins();
  };

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
      var time = timeIn.value;
      map.classList.remove('map--faded');
      window.formValidation.setStatus(notice.querySelectorAll('fieldset'), true);
      window.formValidation.setStatus(map.querySelectorAll('select'), true);
      map.querySelector('.map__filters').classList.remove('map__filters--disabled');
      notice.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.load(successHandler, errorHandler);
      window.formValidation.setAddress(true);
      window.formValidation.checkRooms(selectRoom.options[room].value);
      window.formValidation.checkType();
      window.formValidation.checkTimes(time);
      mapPinMain.removeEventListener('mousedown', mainPinClichHandler);
      mapPinMain.removeEventListener('keydown', mainPinClichHandler);

      formResetButton.addEventListener('click', formResetClickHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mainPinClichHandler);

  mapPinMain.addEventListener('keydown', mainPinClichHandler);

  window.noActivePage = noActivePage;

})();
