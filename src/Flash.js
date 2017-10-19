'use strict'

import $ from 'jquery'

export default class Flash {

    constructor ($flash, options = {}) {
        if (!$flash) throw new Error ('$flash parameter is not defined')
        this.$flash = $flash
        this.options = Object.assign({}, Flash.DEFAULT_OPTIONS, options)
        this.c_timeout = null
        this.$container = $(this.options.container)
        this._setInstance()
        this._build()
        this._initEvents()
    }

    static get DEFAULT_OPTIONS () {
        return {
            timeout: 8000,
            appear_delay: 200,
            remove_delay: 1000,
            visible: 'is-visible',
            container: '.flash-container'
        }
    }

    _setInstance () {
        if (this.$flash instanceof $) return
        if (this.$flash.constructor === String) this.$flash = $(this.$flash)
        if (!this.$flash || !this.$flash.length) throw new Error ('$flash parameter must be a valid jQuery object or a valid CSS selector')
    }

    _build () {
        window.setTimeout(() => {
            this.$flash.addClass(this.options.visible)
            this._run()
        }, this.options.appear_delay)
    }

    _run () {
        this.c_timeout = window.setTimeout(() => this._close(), this.options.timeout)
    }

    _stop () {
        if (this.c_timeout !== null) {
            window.clearTimeout(this.c_timeout)
            this.c_timeout = null
        }
    }

    _initEvents () {
        this.$flash
            .hover(() => this._stop(), () => this._run())
            .on('click', () => this._close())
    }

    _close () {
        this.$flash.removeClass(this.options.visible)
        window.setTimeout(() => {
            this.$flash.remove()
            this._clear()
        }, this.options.remove_delay)
    }

    _clear () {
        if (!this.$container.children().length) this.$container.remove()
    }

}
