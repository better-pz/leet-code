# 防抖节流

## 防抖: 当事件频繁
```js
function debounce(fn,delay) {
  let timer //利用闭包保存同一个timer
  return function () {
    let self = this
    let arg = arguments
    clearTimeout(timer)
    timer =  setTimeout(()=> {
      fn.apply(self,arg)
    },delay)
  }
}
```

## 节流: 预定一个函数只有在大于等于执行周期时才执行
```js
1. 使用时间戳
function throttle(fn,delay) {
  let t
  return function  () {
    let self = this
    let arg = arguments
    if(!t || Date.now() - t >=delay) {
      fn.apply(self,arg)
      t = new Date()     
    }
  }
}
```

2. 使用定时器

使用定时器的思路,触发的过程中会在timer这个周期内执行, 在这个时内不断的将时间清空即可以,当时间到了之后就不能执行函数了
```js
function throttle(fn,delay) {
  let timer
  retrun function () {
    let self = this
    let arg = arguments

    if(timer) return
    timer = setTimeOut(()=> {
      fn.apply(fn,arg)
      timer = null
    },delay)
  }
}
```

s