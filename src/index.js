import Flash from './Flash'
import FlashMessage from './FlashMessage'

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