(function (window, document, $, undefined) {

  'use strict';

  // With vanilla JavaScript
  document.addEventListener('DOMContentLoaded', function () {
    /*window.FlashMessage.addCustomVerbs('forbidden','disabled');

    // Default types
    window.FlashMessage.success('Success', {
      timeout: 8000,
      progress: true
    });
    window.FlashMessage.warning('Warning', {
      timeout: 5000,
      progress: true
    });
    window.FlashMessage.error('Error', {
      timeout: 7000,
      progress: true
    });
    window.FlashMessage.info('Info', {
      timeout: 8000,
      progress: true
    });

    // Custom types
    window.FlashMessage.forbidden('Forbidden', {
      timeout: 10000,
      progress: true
    });
    window.FlashMessage.disabled('Disabled', {
      timeout: 2000,
      progress: true
    });*/
    
    // Add flash behavior on existing DOM element
    var f = Flash.create('.js-msg', {
      progress: true
    });
  }, false);

  // OR

  // With a jQuery plugin
  /*$('document').ready(function () {

    $('.jq-msg').flashjs();

  });*/

})(window, document, jQuery)