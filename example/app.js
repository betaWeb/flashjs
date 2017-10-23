(function (window, document, $, undefined) {

  'use strict';

  // With vanilla JavaScript
  document.addEventListener('DOMContentLoaded', function () {
    window.FlashMessage.addCustomVerbs('forbidden','disabled');

    // Default types
    window.FlashMessage.success('Success');
    window.FlashMessage.warning('Warning');
    window.FlashMessage.error('Error');
    window.FlashMessage.info('Info');

    // Custom types
    window.FlashMessage.forbidden('Forbidden');
    window.FlashMessage.disabled('Disabled');
    
    // Add flash behavior on existing DOM element
    var f = new Flash('.flash-message');
  }, false);

  // OR

  // With a jQuery plugin
  $('document').ready(function () {

    $('.flash-message').flashjs();

  });

})(window, document, jQuery)