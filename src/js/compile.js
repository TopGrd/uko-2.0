import Watcher from './watcher'

function isUkoBind(ele) {
  return ele.nodeName.indexOf('u-') > -1
}

export default class Compiler {
  constructor(el, uko) {
    this.watchList = {}
    this.tpl = el
    this.uko = uko
    this.watcher = new Watcher(uko)
    this.transclude()
    this.scanDom(this.uko.$vdom)
    this.uko.mount()
  }

  transclude() {
    this.uko.$vdom = document.createElement('div')
    this.uko.$vdom.innerHTML = this.tpl
  }

  update(node) {
    const tpl = node.textContent
    const newVal = this.compile(tpl, node)
    node.textContent = newVal
  }

  compile(tpl, node) {
    const re = /\{\{\s*([^}]+\S)\s*\}\}/g
    let temp = tpl
    let match = ''
    while ((match = re.exec(temp))) {
      this.watcher.collect(match[1], node)
      temp = temp.replace(match[0], this.uko.$data[match[1]])
    }
    return temp
  }

  scanDom(node) {
    if (node.childNodes && node.childNodes.length > 0) {
      Array.from(node.childNodes).forEach((child) => {
        this.scanDom(child)
      })
    }
    this.check(node)
    // this.replace()
  }

  check(node) {
    let model = []
    const self = this
    if (node.nodeType === 1) {
      const attrs = Array.from(node.attributes)
      if (attrs.length !== 0) {
        model = attrs.filter(isUkoBind).map((key) => {
          if (key.nodeName === 'u-model') {
            self.watcher.collect(key.nodeValue)
            this.bindValueChange(key, node)
          } else {
            self.bindUkoEvent(key, node)
          }
          return key.nodeValue
        })
      }
    } else if (node.nodeType === 3) {
      this.update(node)
    }
  }

  bindUkoEvent(key, node) {
    let args = /\(.*\)/.exec(key.nodeValue)
    let fun = ''
    if (args) {
      args = args[0]
      fun = key.nodeValue.replace(args, '')
      args = args.replace(/[(|)|'|"]/g, '').split(',')
    }
    const evt = key.nodeName.split('-')[1]
    node.addEventListener(evt, () => {
      // eslint-disable-next-line
      this.uko[fun].apply(this.uko, args)
    }, false)
  }

  bindValueChange(key, node) {
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      node.addEventListener('input', (e) => {
        this.uko[key.nodeValue] = e.target.value
      }, false)
    }
  }
}
