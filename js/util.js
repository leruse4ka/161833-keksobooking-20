'use strict';

(function () {
  window.util = {
    ADVERTS_TYPES: ['palace', 'flat', 'house', 'bungalo'],
    ADVERTS_TIMES: ['12:00', '13:00', '14:00'],
    ADVERTS_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ADVERTS_PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    MAP_PIN_MAIN_WIDTH: 65,
    MAP_PIN_MAIN_HEIGHT: 65,
    MAP_PIN_MAIN_HEIGHT_END: 82,
    MIN_NAME_LENGTH: 30,
    MAX_NAME_LENGTH: 100,
    MIN_LEFT_COORDS: 0,
    MIN_TOP_COORDS: 130,
    MAX_TOP_COORDS: 630,
    typesName: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    minPrice: {
      palace: '10000',
      flat: '1000',
      house: '5000',
      bungalo: '0'
    }
  };
})();
