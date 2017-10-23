'use strict'

export default class Flash {

    constructor ($flash, options = {}) {
        if (!$flash) throw new Error ('Flash.constructor - $flash parameter is not defined')

        this.$flash = $flash
        this.options = Object.assign({}, Flash.DEFAULT_OPTIONS, options)
        this.c_timeout = null
        this.$container = document.querySelector(this.options.container) || null

        this._setElement()
        this._process()
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

    _setElement () {
        if (this.$flash instanceof Element) return
        if (this.$flash.constructor === String) this.$flash = document.querySelectorAll(this.$flash) || null
        if (!this.$flash) throw new Error ('$flash parameter must be an instance of DOM Element or NodeList, or a valid CSS selector')
    }

    _process () {
        if (
            Array.isArray(this.$flash) 
            || this.$flash.constructor === NodeList
        ) {
            this.$flash.forEach(item => new Flash(item, this.options))
        } else {
            this._build()
            this._bindEvents()
        }
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

    _bindEvents () {
        this._bindEvent('mouseover', () => this._stop())
        this._bindEvent('mouseleave', () => this._run())
        this._bindEvent('click', () => this._close())
    }

    _bindEvent (event_name, callback) {
        try {
            if (!this.$flash.addEventListener) this.$flash.attachEvent(`on${this._getEventName(event_name)}`, callback)
            else this.$flash.addEventListener(event_name, callback, false)
        } catch (err) {
            throw new Error(`Flash._bindEvent - Cannot add event on element - ${err}`)
        }
        
    }

    _unbindEvents () {
        this._unbindEvent('mouseover', () => this._stop())
        this._unbindEvent('mouseleave', () => this._run())
        this._unbindEvent('click', () => this._close())
    }

    _unbindEvent (event_name, callback) {
        try {
            if (!this.$flash.removeEventListener) this.$flash.detachEvent(`on${this._getEventName(event_name)}`, callback)
            else this.$flash.removeEventListener(event_name, callback, false)
        } catch (err) {
            throw new Error(`Flash._unbindEvent - Cannot remove event on element - ${err}`)
        }
    }

    _getEventName (event_name) {
        return event_name.charAt(0).toUpperCase() + event_name.substr(1)
    }

    _close () {
        this.$flash.classList.remove(this.options.visible)
        window.setTimeout(() => {
            this.$container.removeChild(this.$flash)
            this._unbindEvents()
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
