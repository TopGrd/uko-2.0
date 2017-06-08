class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach((sub) => {
      console.log('update')
      sub.update()
    })
  }
}

export default Dep
