'use strict'

export default class Flash {

    constructor (selector = null, options = {}) {
        if (selector && selector.constructor === Object) {
            options = selector
            selector = null
        }

        this.selector = selector
        this.options = Object.assign({}, Flash.DEFAULT_OPTIONS, options)
        this._bag = []

        this._setElement()
        this._process()
    }

    static get DEFAULT_OPTIONS () {
        return {
            limit: 0
        }
    }

    static create (sel = null, options = {}) {
        return new Flash(sel, options)
    }

    getBag () {
        return this._bag
    }

    setBag (value) {
        this._bag.push(value)
        return this
    }

    attach (...args) {
        this._bag.push(...args)
        this._checkLimit()
        return this
    }

    detach (value) {
        this._bag = this._bag.filter(item => value instanceof FlashMessage && item !== value)
        return this
    }

    _setElement () {
        if (!this.selector || this.selector instanceof Element) return
        if (this.selector.constructor === String) this.selector = document.querySelectorAll(this.selector) || null
    }

    _process () {
        if (!this.selector) return
        if (Array.isArray(this.selector) || this.selector.constructor === NodeList)
            this.selector.forEach(item => this.setBag(new FlashMessage(item, this.options)))
        else
            this.setBag(new FlashMessage(this.selector, this.options))
        this._checkLimit()
    }

    _checkLimit () {
        if (this.options.limit && this._bag.length > this.options.limit) {
            for (let i = 0; i < this._bag.length - this.options.limit; ++i) {
                this._bag[i].destroy()
                this.detach(this._bag[i])
            }
        }
    }

}
