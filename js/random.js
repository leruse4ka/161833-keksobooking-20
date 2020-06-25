'use strict';

(function () {
  var getRandomValue = function (name) {
    var randomIndex = Math.floor(Math.random() * name.length);
    return name[randomIndex];
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
  };

  var getRandomFeatures = function () {
    var randomFeaturesIndex = window.random.getRandomNumber(0, window.util.ADVERTS_FEATURES.length);
    var randomFeatures = [];
    for (var i = 0; i < randomFeaturesIndex; i++) {
      randomFeatures[i] = window.util.ADVERTS_FEATURES[i];
    }
    return randomFeatures;
  };

  window.random = {
    getRandomValue: getRandomValue,
    getRandomNumber: getRandomNumber,
    getRandomFeatures: getRandomFeatures
  };
})();
