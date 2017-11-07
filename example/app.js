(function (window, document, $, undefined) {

  'use strict';

  // With vanilla JavaScript
  document.addEventListener('DOMContentLoaded', function () {
    window.FlashMessage.addCustomVerbs('forbidden','disabled');

    // Default types
    window.FlashMessage.success('Success', {
      timeout: 8000,
      interactive: false,
      progress: true,
      theme: 'dark'
    });
    window.FlashMessage.warning('Warning', {
      timeout: 5000,
      progress: true,
      onClick: () => alert('Click on warning message !')
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
    });
    
    // Add flash behavior on existing DOM element
    Flash.create('.js-msg');
    
    // Create a flash bag and attach messages into it
    var bag = Flash.create({ limit: 2 });
    bag.attach(
      window.FlashMessage.success('Message bag #1'),
      window.FlashMessage.info('Message bag #2', { progress: true }),
      window.FlashMessage.error('Message bag #3')
    );

    document.getElementById('flash-btn').addEventListener('click', function () {
      new window.FlashMessage(
        this.dataset.message,
        this.dataset.type,
        {
          timeout: this.dataset.timeout,
          progress: true,
          // thumb: 'https://pbs.twimg.com/profile_images/659436766420672512/-pS2Bgfl.jpg'
        }
      )
    });

  }, false);

  // OR

  // With a jQuery plugin
  $('document').ready(function () {

    $('.jq-msg').flashjs();

  });

})(window, document, jQuery)