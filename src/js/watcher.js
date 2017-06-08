import observer from './observer'
import Dep from './Dep'

class Watcher {
  constructor(uko) {
    this.uko = uko
  }

  collect(key, node) {
    this.watchNode = node
    this.watchKey = key
    Dep.target = this
    this.value = this.uko.$data[key]
    Dep.target = null
  }

  update() {
    // this.uko.$compiler.reactive(this.watchNode, this.value)
    this.watchNode.textContent = this.uko.$data[this.watchKey]
  }
}

export default Watcher
