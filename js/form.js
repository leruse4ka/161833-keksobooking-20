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

  window.formValidation = {
    setStatus: function (status, active) {
      if (active) {
        status.forEach(function (activeItem) {
          activeItem.removeAttribute('disabled', 'disabled');
        });
      } else {
        status.forEach(function (disabledItem) {
          disabledItem.setAttribute('disabled', 'disabled');
        });
      }
    },

    setAddress: function (active) {
      notice.querySelector('#address').setAttribute('disabled', 'disabled');
      if (active) {
        var top = mapPinMain.offsetTop + window.util.MAP_PIN_MAIN_HEIGHT_END;
      } else {
        top = mapPinMain.offsetTop + (window.util.MAP_PIN_MAIN_HEIGHT / 2);
      }
      var left = mapPinMain.offsetLeft + (window.util.MAP_PIN_MAIN_WIDTH / 2);
      notice.querySelector('#address').value = top + ', ' + left;
    },

    checkRooms: function (rooms) {
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
    }
  };

  selectRoom.addEventListener('change', function (evt) {
    var target = evt.target;
    window.formValidation.checkRooms(target.value);
  });
})();
