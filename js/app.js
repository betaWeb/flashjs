jQuery(document).ready(function($) {
	
	var btns = $('button[data-flash]', '#examples-1').each(function () {
		$(this).click(function () {
			var $el = $(this);
			var type = $el.data('flash');
			var message = $el.data('message');
			var flash = new window.FlashMessage(message, type);
		});
	});

});