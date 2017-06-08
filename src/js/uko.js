import observer from './observer'
import Compiler from './compile'

class Uko {
  constructor({ el, tpl, data, methods }) {
    this.$data = data
    this.$tpl = tpl
    this.$el = document.querySelector(el)
    this.$methods = methods
    this._proxy(this.$data)
    this._proxy(this.$methods)
    observer(this.$data)
    this.$compiler = new Compiler(tpl, this)
  }

  _proxy(data) {
    const self = this
    Object.keys(data).forEach((key) => {
      Object.defineProperty(self, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        }
      })
    })
  }

  mount() {
    this.$el.appendChild(this.$vdom)
  }
}

export default Uko
