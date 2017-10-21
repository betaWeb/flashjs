'use strict'

import Flash from './Flash'

export default class FlashMessage {

    constructor (message, type = 'danger', options = {}) {
        this.message = message
        this.type = type
        this.options = Object.assign({}, FlashMessage.DEFAULT_OPTIONS, options)
        this.$_container = null
        this.$_message = null
        this._createContainer()
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
        this.$_message = document.createElement('div')
        this.$_message.classList.add('flash-message', `flash-${this.type}`)
        this.$_message.innerHTML = this.message
        this._append()
        this._display()
    }

    _append () {
        this.$_container.appendChild(this.$_message)
    }

    _createContainer () {
        this.$_container = document.querySelector(this.options.container) || null
        if (
            !this.$_container 
            || !this.$_container.length 
            || !node.contains(this.$_container)
        ) {
            this.$_container = document.createElement('div')
            this.$_container.classList.add(this.options.container.replace(/^\./g, ''))
            if (document.body.firstChild) document.body.insertBefore(this.$_container, document.body.firstChild)
            else document.body.appendChild(this.$_container)
        }
    }

    _display () {
        new Flash(this.$_message, this.options)
    }

}