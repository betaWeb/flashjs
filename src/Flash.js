'use strict'

export default class Flash {

    constructor (selector, options = {}) {
        if (!selector) throw new Error ('Flash.constructor - `selector` parameter is not defined')

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

    static create (el, options = {}) {
        return new Flash(el, options)
    }

    getBag () {
        return this._bag
    }

    setBag (value) {
        this._bag.push(value)
        return this
    }

    _setElement () {
        if (this.selector instanceof Element) return
        if (this.selector.constructor === String) this.selector = document.querySelectorAll(this.selector) || null
        if (!this.selector) throw new Error ('The selector parameter must be an instance of DOM Element or NodeList, or a valid CSS selector')
    }

    _process () {
        if (
            Array.isArray(this.selector) 
            || this.selector.constructor === NodeList
        ) {
            this.selector.forEach(item => {
                let f = new FlashMessage(item, this.options)
                this.setBag(f)
            })
        } else {
            let f = new FlashMessage(this.selector, this.options)
            this.setBag(f)
        }
        this._checkLimit()
    }

    _checkLimit () {
        if (this.options.limit && this._bag.length > this.options.limit) {
            for (let i = 0; i < this._bag.length - this.options.limit; ++i) {
                this._bag[i].destroy()
            }
        }
    }

}
