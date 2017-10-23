'use strict'

export default class Flash {

    constructor (selector = null, options = {}) {
        if (selector.constructor === Object) {
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

    attach (...args) {
        args.forEach((item, index) => {
            if (!(item instanceof FlashMessage)) args.splice(index, 1)
            else item.setOptions(this.options)
        })
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
        // if (!this.selector) throw new Error ('The selector parameter must be an instance of DOM Element or NodeList, or a valid CSS selector')
    }

    _process () {
        if (!this.selector) return
        if (
            Array.isArray(this.selector) 
            || this.selector.constructor === NodeList
        ) {
            this.selector.forEach(item => {
                let f = new FlashMessage(item, this.options)
                this.attach(f)
            })
        } else {
            let f = new FlashMessage(this.selector, this.options)
            this.attach(f)
        }
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
