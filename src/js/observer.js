import Dep from './Dep'

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function observerProp(provider, prop) {
  let value = provider[prop]
  const dep = new Dep()
  Object.defineProperty(provider, prop, {
    get() {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      value = newValue
      dep.notify()
    }
  })
}

// 深度优先遍历Provider监听
function observer(provider) {
  for (let prop in provider) {
    if (Object.prototype.hasOwnProperty.call(provider, prop)) {
      observerProp(provider, prop)
      if (isObject(provider[prop])) {
        observer(provider[prop])
      }
    }
  }
}

export default observer
