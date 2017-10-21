document.addEventListener('DOMContentLoaded', function () {
  window.FlashMessage.addCustomTypes('forbidden','disabled');
  window.FlashMessage.success('Success');
  window.FlashMessage.warning('Warning');
  window.FlashMessage.error('Error');
  window.FlashMessage.info('Info');
  window.FlashMessage.forbidden('Forbidden');
  window.FlashMessage.disabled('Disabled');
}, false);