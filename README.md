## uko-2.0
数据劫持实现的mvvm
### useage
```js
const test = new Uko({
  el: '#app',
  tpl: `<div>
    hello {{name}}
    <input u-model="food" u-click="add('hello')" type="text" />
    {{food}}
    <button u-click="changeName()">change</button>
  </div>`,
  data: {
    name: 'uko',
    food: 'apple'
  },
  methods: {
    add(e) {
      this.food += e
    },
    changeName() {
      this.name = 'uko 2.0'
    }
  }
})
```
