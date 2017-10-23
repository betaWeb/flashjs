import'./polyfills'
import Flash from './Flash'
import FlashMessage from './FlashMessage'
import './flash.jquery'

(function (w) {
  if (w !== undefined) {
    if (!(w.Flash)) {
      w.Flash = Flash
    }
    if (!(w.FlashMessage)) {
      w.FlashMessage = FlashMessage
    }
  }
})(window, undefined)

export default { Flash, FlashMessage }