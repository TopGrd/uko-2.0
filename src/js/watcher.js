import observer from './observer'
import Dep from './Dep'

class Watcher {
  constructor(uko, key, node, tpl) {
    this.uko = uko
    this.tpl = tpl
    this.watchNode = node
    this.watchKey = key
    Dep.target = this
    this.value = this.uko.$data[key]
    Dep.target = null
  }

  update() {
    let val = ''
    if (this.watchNode.nodeType === 3) {
      val = this.uko.$compiler.compile(this.tpl, this.watchNode, true)
    } else {
      val = this.uko[this.watchKey]
    }
    this.watchNode.textContent = val
    this.watchNode.value = val
  }
}

export default Watcher
