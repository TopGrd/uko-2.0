## uko-2.0
数据劫持实现的mvvm
### useage
```js
const test = new Uko({
  el: '#app',
  tpl: `<div>
    hello uko
    <input u-model="food" u-click="add('hello')" type="text" />
    {{food}}
  </div>`,
  data: {
    food: 'apple'
  },
  methods: {
    add(e) {
      this.food += e
    }
  }
})
```
