'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var notice = document.querySelector('.notice');
  var selectRoom = notice.querySelector('#room_number');
  var selectCapacity = notice.querySelector('#capacity');
  var form = notice.querySelector('.ad-form');


  var setStatus = function (status, active) {
    if (active) {
      status.forEach(function (activeItem) {
        activeItem.removeAttribute('disabled', 'disabled');
      });
    } else {
      status.forEach(function (disabledItem) {
        disabledItem.setAttribute('disabled', 'disabled');
      });
    }
  };

  var setAddress = function (active) {
    notice.querySelector('#address').setAttribute('disabled', 'disabled');
    if (active) {
      var top = mapPinMain.offsetTop + window.util.MAP_PIN_MAIN_HEIGHT_END;
    } else {
      top = mapPinMain.offsetTop + (window.util.MAP_PIN_MAIN_HEIGHT / 2);
    }
    var left = mapPinMain.offsetLeft + Math.floor(window.util.MAP_PIN_MAIN_WIDTH / 2);
    notice.querySelector('#address').value = left + ', ' + top;
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

  selectRoom.addEventListener('change', function (evt) {
    var target = evt.target;
    checkRooms(target.value);
  });

  var formTypes = notice.querySelector('#type');
  var formPrice = notice.querySelector('#price');

  var checkType = function () {
    formPrice.setAttribute('min', window.util.minPrice[formTypes.value]);
    formPrice.placeholder = window.util.minPrice[formTypes.value];
  };

  formTypes.addEventListener('change', checkType);

  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');


  var checkTimes = function (time) {
    var timeOutOption = timeOut.querySelectorAll('option');

    timeOutOption.forEach(function (option) {
      if (option.value === time) {
        option.disabled = false;
        option.selected = true;
      } else {
        option.disabled = true;
      }
    });
  };

  timeIn.addEventListener('change', function (evt) {
    var target = evt.target;
    checkTimes(target.value);
  });

  var messageHandler = function (id) {
    var template = document.querySelector(id).content;
    var message = template.cloneNode(true);
    document.querySelector('main').appendChild(message);
  };

  var successClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0 || evt.key === 'Escape') {
      document.querySelector('.success').remove();

      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', successClickHandler);
    }
  };

  var errorClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0 || evt.key === 'Escape') {
      document.querySelector('.error').remove();

      document.removeEventListener('click', errorClickHandler);
      document.removeEventListener('keydown', errorClickHandler);
    }
  };

  var successHandler = function () {
    messageHandler('#success');
    window.deactivatePage();
    form.reset();

    document.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successClickHandler);
  };

  var errorHandler = function () {
    messageHandler('#error');
    document.addEventListener('click', errorClickHandler);
    document.addEventListener('keydown', errorClickHandler);
  };

  form.addEventListener('submit', function (evt) {

    notice.querySelector('#address').removeAttribute('disabled', 'disabled');

    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  window.formValidation = {
    setStatus: setStatus,
    setAddress: setAddress,
    checkRooms: checkRooms,
    checkType: checkType,
    checkTimes: checkTimes
  };

})();
