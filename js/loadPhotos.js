'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'png', 'jpeg', 'gif'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var photosChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photosPreview = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChooser.addEventListener('change', function () {
    var file = photosChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photosPreview.innerHTML = '<img src ="" alt= "Фотография жилья" width="70" height="70">';
        photosPreview.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
