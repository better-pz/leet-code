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

# call apply bind
三者都是用来改变this指向的

1. **call**
使用:
```js
 function.call(thisArg,arg1,grg2,...)
```
 + `thisArg` 可选参数,function执行时内部的this指向`thisArg`
 + arg1,arg2,... 可选参数,传递给function的参数列表
 + 返回值:在指定的this值和所传递的参数下调用此函数的返回结果
注意:
1. function函数将会立即执行
2. 在执行时,会将函数内部的this指向thisArg
3. 出thisArg外的所有剩余参数将全部传递给function
4. 返回function函数执行后的结果

```js
Function.prototype.myCall = function (context, ...arr) {
  
  console.log('调用mycall中的this',this)
  if (context === null || context === undefined) {
    context = window
  }else {
    context= Object(context)
  }
  const specialPrototype = Symbol('特殊属性symbol')
  context[specialPrototype] = this
  let result = context[specialPrototype](...arr)
  delete context[specialPrototype]
  return result
} 

```

2. **apply**

注意:
+ 使用apply只支持两个参数,第一个为thisArg,第二个是包括多个参数的数组

```js

Function.prototype.myApply = function (context,arr) {
  console.log(this)
  if (context === null || context === undefined) {
    context = window
  }else {
    context= Object(context)
  }
  const specialPrototype = Symbol('特殊属性symbol')
  context[specialPrototype] = this
  let result = context[specialPrototype](...arr)
  delete context[specialPrototype]
  return result
} 
```