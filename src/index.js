import Flash from './Flash'
import FlashMessage from './FlashMessage'
import './flash.jquery.js'

if (window !== undefined) {
  if (!window.jQuery) {
    throw new Error('flashjs requires jQuery')
  } else {
    if (!(window.Flash)) {
      window.Flash = Flash
    }
    if (!(window.FlashMessage)) {
      window.FlashMessage = FlashMessage
    }
  }
}

export default { Flash, FlashMessage }