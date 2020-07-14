'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var PriceType = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var filterByType = function (data) {
    return (housingType.value === 'any') ? true : data.offer.type === housingType.value;
  };

  var filterByPrice = function (data) {
    switch (housingPrice.value) {
      case PriceType.LOW:
        return data.offer.price <= PriceType.MIN;
      case PriceType.MIDDLE:
        return data.offer.price >= PriceType.MIN && data.offer.price <= PriceType.MAX;
      case PriceType.HIGH:
        return data.offer.price >= PriceType.MAX;
      default:
        return true;
    }
  };

  var filterByRoom = function (data) {
    return (housingRooms.value === 'any') ? true : data.offer.rooms === Number(housingRooms.value);
  };

  var filterByGuest = function (data) {
    return (housingGuests.value === 'any') ? true : data.offer.guests === Number(housingGuests.value);
  };

  var housingFeatures = mapFilters.querySelector('.map__features');

  var filterByFeature = function (data) {
    var features = Array.from(
        housingFeatures.querySelectorAll('input:checked'))
      .map(function (feature) {
        return feature.value;
      });

    return features.every(function (feature) {
      return data.offer.features.includes(feature);
    });
  };

  var updatePins = function (data) {
    return data.filter(function (el) {
      return filterByType(el) &&
        filterByPrice(el) &&
        filterByRoom(el) &&
        filterByGuest(el) &&
        filterByFeature(el);
    }).slice(0, 5);
  };

  var onMapFiltersChange = function () {
    window.debounce(window.renderPins(window.filter.updatePins(window.pins)));
  };

  window.filter = {
    updatePins: updatePins,
    onMapFiltersChange: onMapFiltersChange
  };

})();


// window.wizard.onEyesChange = window.debounce(function (color) {
//   colorEyes = color;
//   window.updateWizards();
// });
