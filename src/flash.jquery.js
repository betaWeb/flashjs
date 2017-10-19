import Flash from '../src/Flash'
import jQuery from 'jquery'

;(function($, window, document, undefined) {

	"use strict";

    var pluginName = "flash";

    function Plugin (element, options) {
        this.element = element;
        this.settings = $.extend({}, options);
        this._name = pluginName;
        this.init(this.element);
    }

    $.extend(Plugin.prototype, {
        init: (elm) => {
            let flash = new Flash(elm)
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(() => {
            if (!$.data(this, "plugin_" + pluginName))
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        })
    }

})(jQuery, window, document)