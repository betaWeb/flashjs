import Flash from './Flash'
import FlashMessage from './FlashMessage'

if (window !== undefined) {
  if (!(window.Flash)) {
    window.Flash = Flash
  }
  if (!(window.FlashMessage)) {
    window.FlashMessage = FlashMessage
  }
}

export default { Flash, FlashMessage }