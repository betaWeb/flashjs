'use strict'

export default class Flash {

    constructor ($flash = '.flash', options = {}) {
        if (!$flash) throw new Error ('Flash.constructor - $flash parameter is not defined')

        this.$flash = $flash
        this.options = Object.assign({}, Flash.DEFAULT_OPTIONS, options)
        this.c_timeout = null
        this.$container = document.querySelector(this.options.container) || null

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
            flash: '.flash',
            container: '.flash-container'
        }
    }

    _setInstance () {
        if (this.$flash instanceof Element) return
        if (this.$flash.constructor === String) this.$flash = document.querySelector(this.$flash)
        if (!this.$flash || !this.$flash.length) throw new Error ('$flash parameter must be an instance of DOM Element or a valid CSS selector')
    }

    _build () {
        window.setTimeout(() => {
            this.$flash.classList.add(this.options.visible)
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
        this.$flash.addEventListener('mouseover', () => this._stop(), false)
        this.$flash.addEventListener('mouseleave', () => this._run(), false)
        this.$flash.addEventListener('click', () => this._close(), false)
    }

    _clearEvents () {
        this.$flash.removeEventListener('mouseover', () => this._stop(), false)
        this.$flash.removeEventListener('mouseleave', () => this._run(), false)
        this.$flash.removeEventListener('click', () => this._close(), false)
    }

    _close () {
        this.$flash.classList.remove(this.options.visible)
        window.setTimeout(() => {
            this.$container.removeChild(this.$flash)
            this._clearEvents()
            this._clear()
        }, this.options.remove_delay)
    }

    _clear () {
        if (
            !this.$container.hasChildNodes() 
            && this.$container.parentNode.contains(this.$container)
        ) this.$container.parentNode.removeChild(this.$container)
    }

}
