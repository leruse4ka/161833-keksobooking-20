'use strict';

(function () {
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var createXhr = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = createXhr(successHandler, errorHandler);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (successHandler, errorHandler) {
    var xhr = createXhr(successHandler, errorHandler);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
