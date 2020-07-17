'use strict';

(function () {

  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var mapPinMain = document.querySelector('.map__pin--main');

  var deactivateForm = function () {
    window.formValidation.setAddress(false);
    window.formValidation.setStatus(notice.querySelectorAll('fieldset'), false);
    window.formValidation.setStatus(map.querySelectorAll('select'), false);
    map.querySelector('.map__filters').classList.add('map__filters--disabled');
    map.querySelector('.map__filters').reset();
  };

  deactivateForm();

  var deactivatePage = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var avatarPhoto = document.querySelector('.ad-form-header__preview img');
    var advertPhoto = document.querySelector('.ad-form__photo');
    var featuresInput = notice.querySelectorAll('.feature__checkbox');

    deactivateForm();
    map.classList.add('map--faded');
    avatarPhoto.src = 'img/muffin-grey.svg';
    advertPhoto.innerHTML = '';
    featuresInput.forEach(function (feature) {
      feature.checked = false;
    });
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
    var form = notice.querySelector('.ad-form');
    evt.preventDefault();
    deactivatePage();
    form.reset();

    formResetButton.removeEventListener('click', formResetClickHandler);
  };

  var successHandler = function (data) {
    window.pins = data;
    window.renderPins(window.filter.updatePins(data));
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

  var mapFilters = document.querySelector('.map__filters');

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
      mapFilters.addEventListener('change', window.filter.mapFiltersHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', mainPinClichHandler);

  mapPinMain.addEventListener('keydown', mainPinClichHandler);

  window.deactivatePage = deactivatePage;

})();
