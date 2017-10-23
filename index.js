import'./src/polyfills'
import Flash from './src/Flash'
import FlashMessage from './src/FlashMessage'

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