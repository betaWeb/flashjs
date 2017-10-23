;(function($, window, document, undefined) {

    "use strict";

    if (!window.Flash) {
        throw new Error("[Err] flash.jquery.js - Cannot find Flash.js. Make sure you have include this on your HTML.");
    }

    var pluginName = "flashjs";

    function Plugin (element, options) {
        this.element = element;
        this.settings = $.extend({}, options);
        this._name = pluginName;
        this.init(this.element);
    }

    $.extend(Plugin.prototype, {
        init: (elm) => {
            let flash = new window.Flash(elm)
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(() => {
            if (!$.data(this, "plugin_" + pluginName))
                $.data(this, "plugin_" + pluginName, new Plugin(this.toArray(), options))
        })
    }

})(jQuery, window, document)