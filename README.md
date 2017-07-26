## uko-2.0
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FTopGrd%2Fuko-2.0.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FTopGrd%2Fuko-2.0?ref=badge_shield)

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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FTopGrd%2Fuko-2.0.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FTopGrd%2Fuko-2.0?ref=badge_large)