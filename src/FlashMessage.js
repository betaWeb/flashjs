'use strict'

import Flash from './Flash'

export default class FlashMessage {
    
    static get _CONSTANTS () {
        return {
            TYPES: {
                SUCCESS: 'success',
                WARNING: 'warning',
                ERROR: 'error',
                INFO: 'info',
            },
            THEME: 'default',
            CONTAINER: '.flash-container',
            CLASSES: {
                CONTAINER: 'flash-container',
                VISIBLE: 'is-visible',
                FLASH: 'flash-message',
                PROGRESS: 'flash-progress',
                PROGRESS_HIDDEN: 'is-hidden'
            },
        }
    }
    
    static get DEFAULT_OPTIONS () {
        return {
            progress: false,
            interactive: true,
            timeout: 8000,
            appear_delay: 200,
            remove_delay: 600,
            container: FlashMessage._CONSTANTS.CONTAINER,
            classes: {
                container: FlashMessage._CONSTANTS.CLASSES.CONTAINER,
                visible: FlashMessage._CONSTANTS.CLASSES.VISIBLE,
                flash: FlashMessage._CONSTANTS.CLASSES.FLASH,
                progress: FlashMessage._CONSTANTS.CLASSES.PROGRESS,
                progress_hidden: FlashMessage._CONSTANTS.CLASSES.PROGRESS_HIDDEN
            },
            theme: FlashMessage._CONSTANTS.THEME,
            onShow: null,
            onClick: null,
            onClose: null,
        }
    }

    constructor (
        message, 
        type = FlashMessage._CONSTANTS.TYPES.ERROR, 
        options = {}
    ) {
        if (type.constructor === Object) {
            options = type
            type = FlashMessage._CONSTANTS.TYPES.ERROR
        }

        this.$_element = null
        this.setOptions(options)

        if (message instanceof Element) {
            this.$_element = message
            this._composeMessage()
        } else {
            this.message = message
            this.type = type
        }

        this.$_container = document.querySelector(this.options.container) || null
        this._c_timeout = null
        
        this.$_progress = null
        this._progress_value = 0
        this._progress_offset = 0
        this._progress_interval = null

        this._createContainer()
        this._createMessage()
    }

    static create (message, type = FlashMessage._CONSTANTS.TYPES.ERROR, options = {}) {
        return new FlashMessage(message, type, options)
    }

    static success (message, options = {}) {
        return new FlashMessage(message, FlashMessage._CONSTANTS.TYPES.SUCCESS, options)
    }

    static warning (message, options = {}) {
        return new FlashMessage(message, FlashMessage._CONSTANTS.TYPES.WARNING, options)
    }

    static error (message, options = {}) {
        return new FlashMessage(message, FlashMessage._CONSTANTS.TYPES.ERROR, options)
    }

    static info (message, options = {}) {
        return new FlashMessage(message, FlashMessage._CONSTANTS.TYPES.INFO, options)
    }

    static addCustomVerbs (...verbs) {
        if (!verbs || !verbs.length) return
        verbs.forEach(verb => {
            if (!FlashMessage[verb])
                FlashMessage[verb] = (message, options = {}) => new FlashMessage(message, verb, options)
        })
    }

    setOptions (options = {}) {
        this.options = Object.assign({}, FlashMessage.DEFAULT_OPTIONS, options)
        return this
    }

    destroy () {
        this._close()
    }
    
    _createContainer () {
        if (this.$_container === null || !document.body.contains(this.$_container)) {
            this.$_container = document.createElement('div')
            this.$_container.classList.add(this.options.classes.container)
            if (document.body.firstChild) document.body.insertBefore(this.$_container, document.body.firstChild)
            else document.body.appendChild(this.$_container)
        }
    }

    _composeMessage () {
        this.message = this.$_element.dataset.message || this.$_element.innerHTML || ''
        this.type = this.$_element.dataset.type || FlashMessage._CONSTANTS.TYPES.ERROR
        if (this.$_element.dataset.progress !== undefined) this.setOptions({ progress: true })
        this.$_element.classList.add(`flash-${this.type}`)
    }

    _createMessage () {
        if (!this.$_element) {
            this.$_element = document.createElement('div')
            this.$_element.classList.add(this.options.classes.flash, `flash-${this.type}`)
            this.$_element.setAttribute('data-type', this.type)
            this.$_element.setAttribute('data-message', this.message)
            this.$_element.innerHTML = this.message

            if (this.options.thumb) {
                let thumb = document.createElement('img')
                thumb.classList.add('thumb')
                thumb.src = this.options.thumb
                this.$_element.classList.add('has-thumb')
                this.$_element.appendChild(thumb)
            }

            this._append()
        } else {
            if (this.$_element.querySelector('.thumb')) this.$_element.classList.add('has-thumb')
        }

        this._setTheme()
        
        if (this._hasProgress()) this._progressBar()
        if (this.$_element.dataset.timeout)
            this.options.timeout = parseInt(this.$_element.dataset.timeout, 10)

        this._behavior()
        if (this._isInteractive() === true) this._bindEvents()
    }

    _append () {
        this.$_container.appendChild(this.$_element)
    }

    _behavior () {
        this._run()
        window.setTimeout(
            () => this.$_element.classList.add(this.options.classes.visible), 
            this.options.appear_delay
        )
    }

    _run () {
        this._startProgress()
        this._c_timeout = window.setTimeout(() => this._close(), this.options.timeout)
    }

    _stop () {
        if (this._c_timeout !== null) {
            window.clearTimeout(this._c_timeout)
            this._stopProgress()
            this._c_timeout = null
        }
    }

    _close () {
        this._stopProgress()
        if (this._isInteractive()) this._unbindEvents()
        this.$_element.classList.remove(this.options.classes.visible)
        this.$_element.addEventListener('transitionend', () => {
            this.$_container.removeChild(this.$_element)
            this._clear()
        })
    }

    _clear () {
        if (
            !this.$_container.children.length 
            && this.$_container.parentNode.contains(this.$_container)
        ) this.$_container.parentNode.removeChild(this.$_container)
    }


    _bindEvents () {
        this._bindEvent('mouseover', _ => this._stop())
        this._bindEvent('mouseleave', _ => this._run())
        this._bindEvent('click', _ => this._close())
        
    }

    _bindEvent (event_name, callback) {
        try {
            if (!this.$_element.addEventListener) this.$_element.attachEvent(`on${this._getCapitalizedEventName(event_name)}`, callback)
            else this.$_element.addEventListener(event_name, callback, false)
        } catch (err) {
            throw new Error(`FlashMessage._bindEvent - Cannot add event on element - ${err}`)
        }
        
    }

    _unbindEvents () {
        this._unbindEvent('mouseover', _ => this._stop())
        this._unbindEvent('mouseleave', _ => this._run())
        this._unbindEvent('click', _ => this._close())
    }

    _unbindEvent (event_name, callback) {
        try {
            if (!this.$_element.removeEventListener) this.$_element.detachEvent(`on${this._getCapitalizedEventName(event_name)}`, callback)
            else this.$_element.removeEventListener(event_name, callback, false)
        } catch (err) {
            throw new Error(`FlashMessage._unbindEvent - Cannot remove event on element - ${err}`)
        }
    }

    _isInteractive () {
        return Boolean(this.options.interactive === true)
    }
    
    _getCapitalizedEventName (event_name) {
        return event_name.charAt(0).toUpperCase() + event_name.substr(1)
    }

    _hasProgress () {
        return Boolean(this.options.progress)
    }
    
    _progressBar () {
        this.$_progress = document.createElement('div')
        this.$_progress.classList.add(this.options.classes.progress)
        this.$_element.appendChild(this.$_progress)
    }

    _startProgress () {
        if (!this._hasProgress()) return
        if (!this.$_progress) this._progressBar()
        this._stopProgress()
        this._progress_offset = 0
        this.$_progress.classList.remove(this.options.classes.progress_hidden)
        this._progress_interval = window.setInterval(() => this._setProgress(), 16)
    }

    _setProgress () {
        this.$_progress.style.width = `${this._progress_value}%`
        this._progress_value = ((this._progress_offset * 100) / this.options.timeout).toFixed(2)
        this._progress_offset += 16
        if (this._progress_value >= 100)
            this._stopProgress()
    }


    _stopProgress () {
        if (!this._hasProgress() || !this.$_progress) return
        this.$_progress.classList.add('is-hidden')
        window.clearInterval(this._progress_interval)
        this._progress_interval = null
        this._progress_value = 0
    }

    _setTheme () {
        const theme = this.$_element.dataset.theme || this.options.theme || ''
        if (theme.length && theme !== FlashMessage._CONSTANTS.THEME)
            this.$_element.classList.add(`${theme}-theme`)
    }

}