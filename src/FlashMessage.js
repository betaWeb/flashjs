'use strict'

import $ from 'jquery'
import Flash from './Flash'

export default class FlashMessage {

    constructor (message, type = 'danger', options = {}) {
        this.message = message
        this.type = type
        this.options = Object.assign({}, FlashMessage.DEFAULT_OPTIONS, options)
        this.$_container = $(`body > ${this.options.container}`)
        this.$_message = null
        this._build()
    }

    static success (message, options = {}) {
        return new FlashMessage(message, 'success', options)
    }

    static warning (message, options = {}) {
        return new FlashMessage(message, 'warning', options)
    }

    static error (message, options = {}) {
        return new FlashMessage(message, 'error', options)
    }

    static info (message, options = {}) {
        return new FlashMessage(message, 'info', options)
    }

    static addCustomTypes (...custom_types) {
        if (!custom_types || !custom_types.length) return
        custom_types.forEach(type => {
            if (!FlashMessage[type])
                FlashMessage[type] = (message, options = {}) => new FlashMessage(message, type, options)
        })
    }

    static get DEFAULT_OPTIONS () {
        return {
            container: '.flash-container',
            timeout: 8000
        }
    }

    _build () {
        this.$_message = $('<div>')
        this.$_message
            .addClass(`alert alert-${this.type} flash-message flash-${this.type}`)
            .html(this.message)
        this._append()
        this._display()
    }

    _append () {
        if (!this.$_container || !this.$_container.length) {
            this.$_container = $('<div>')
            this.$_container.addClass(this.options.container.replace(/^\./g, ''))
            this.$_container.prependTo('body')
        }
        this.$_container.append(this.$_message)
    }

    _display () {
        new Flash(this.$_message, this.options)
    }

}