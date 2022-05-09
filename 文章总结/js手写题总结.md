# 防抖节流

## 防抖
使用场景: 输入框输入搜索,拖拽( mousemove )

效果: 不是每次操作后执行函数.在频繁操作的最后一次操作结束后在设置的时间内没有触发操作时才执行回调

两种思路

1. 立即执行: 在第一次触发事件的时候立即执行当前操作的回调,后面的操作在最后一次操作结束后在设置的时间内没有触发操作时才执行回调
2. 无立即执行: 按最后一次操作结束后的规定时间执行

```js
function debounce(fn,delay,immediate) {
  let timer //利用闭包保存同一个timer
  return function () {
    let self = this
    let arg = arguments
    clearTimeout(timer)
    if(immediate) {
      const callNow = !timer
      timer = setTimeOut(()=> {
        timer = null
      },delay)
      if(callNow) fn.apply(self.arg)
    }else {
      timer =  setTimeout(()=> {
        fn.apply(self,arg)
      },delay)
    }
  }
}
```

## 节流
使用场景:滚动条滚动,频繁点击请求接口

效果:预定一个函数只有在大于等于执行周期时才执行 

两种思路:

1. 时间戳,先会立即执行,达到时间周期再执行


```js

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
2. 定时器,定时一定时间周期之后去执行,但是在这时间内中不停的调用,不让他的定时器清零重新计时,不会影响当前的结果,还是那时间继续等,等到达时间周期后触发(会出现停止操作还是会触发)
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

  console.log('调用mycall中的this', this)
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context)
  }
  const specialPrototype = Symbol('特殊属性symbol')
  context[specialPrototype] = this // this指向调用者
  // context[specialPrototype]执行函数调用时this指向context
  let result = context[specialPrototype](...arr)
  delete context[specialPrototype]
  return result
}
// context :{
//   specialPrototype:this->调用者
// }

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

3. **bind**
使用:
```js
 function.bind(thisArg,arg1,grg2,...)
```
 + `thisArg` 可选参数,function执行时会生成一个包裹着`function(...)`的邦迪函数,并且将`function(...)`的this指向thisArg,如果使用new运算符调用这个生成的绑定函数,则忽略`thisArg`
 + arg1,arg2,... 可选参数,传递给function的参数列表
 + 返回值:在指定的this值和所传递的参数下调用此函数的返回结果
注意:
1. bind方法将创建并返回一个新的函数,新函数称为绑定函数,并且此绑定函数包裹着原始函数
2. 执行时,会显示将原始函数内部的this指向了`thisArg`
3. 除thisArg外所有剩余参数将全部传递给function
4. 执行邦定函数时,如果传递了参数,这些参数将全部传递给原始函数function
5. 如果使用new运算符调用生成的绑定函数,则忽略thisArg
  
```js

Function.prototype.mybind = function() {
      //判断调用bind的 是不是函数，抛出异常
      if(typeof this !== "function"){
        throw new Error("function.prototype.bind - what is trying to be bound is not  callable")
    }

  // 将类数组的参数转换成数组然后截取第一个参数
  // const argsArr =Array.prototype.slice.call(arguments)
  const argsArr =[...arguments] 
  const args = argsArr.shift()
  const self = this
  const fToBind = function () {
    console.log('返回函数的参数',arguments)
    const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
    const context = isNew ? this : Object(args) // new调用就绑定到this上,否则就绑定到传入的objThis上
    return self.apply (context,argsArr.concat([...arguments]))
  }
  if(self.prototype) {
    // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
    fToBind.prototype = Object.create(self.prototype)
  }
  return fToBind
}
```

# instanceof
```js
function myInstanceof (A, B) {
  // 遍历链表
  let p =  A
  while (p) {
    p = p.__proto__
    // B的 prototype 属性是否出现在A实例对象的原型链上
    if (p === B.prototype) {
      return true
    }
   
  }
  return false
}
function Foo () {}
var f = new Foo()
console.log(myInstanceof(f, Foo)); // true
console.log(myInstanceof(f, Object)); // true
console.log(myInstanceof([1,2], Array)); // true
console.log(myInstanceof({ a: 1 }, Array)); // false
console.log(myInstanceof(Array,Object)) // true
console.log(Array instanceof Object) // true

```

# 深浅克隆
```js
function shallowClone(source) {
  const target = {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
// 深拷贝1.0
function deeClone1(source) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeClone1(source[key]);
      }
    }
    return target;
  } else {
    return source;
  }
}
const textObject = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
const deepResult = deeClone1(textObject);
const shallowResult = shallowClone(textObject);
console.log("深克隆", deepResult);
console.log("浅克隆", shallowResult);
deepResult.field4.push(1);
console.log("深克隆", deepResult, textObject);

// 深拷贝2.0 解决循环引用问题

const textObject2 = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
textObject2.textObject2 = textObject2;
// 使用1.0克隆克隆循环引用的值会出现爆栈的现象
// const deepResult2 = deeClone1(textObject2);

// 深拷贝2.0 使用Map
// 检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆
function deeCloneMap(source, map = new Map()) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    map.set(source, target);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeCloneMap(source[key], map);
      }
    }
    return target;
  } else {
    return source;
  }
}
const deepResult2 = deeCloneMap(textObject2);
console.log("mapClone", deepResult2);
// 深拷贝2.1 使用是WeakMap弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deeCloneWeakMap(source, map = new WeakMap()) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    map.set(source, target);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeCloneMap(source[key], map);
      }
    }
    return target;
  } else {
    return source;
  }
}
// while循环的性能高 使用while来实现一个通用的forEach遍历，iteratee是遍历的回掉函数，他可以接收每次遍历的value和index两个参数：
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
// 深拷贝3.0 使用是WeakMap弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deeCloneWhile(source, map = new WeakMap()) {
  // 1.判断是否为null 或undefined
  if (typeof source == null) return source;
  // 2.判断是否为日期Date
  if (source instanceof Date) return new Date(osourcebj);
  // 3.判断是否为正则 typeof /\d+/ === 'object'
  if (source instanceof RegExp) return new RegExp(source);

  if (typeof source === "object") {
    const isArray = Array.isArray(source);
    let target = isArray ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    const keys = isArray ? undefined : Object.keys(source);
    map.set(source, target);
    forEach(keys || source, (value, key) => {
      if (keys) {
        key = value;
      }
      target[key] = deeCloneWhile(source[key], map);
    });
    // for (let key in source) {
    //   if (source.hasOwnProperty(key)) {
    //     // 如果属性是对象类型则递归再次遍历赋值
    //     target[key] = deeCloneMap(source[key],map);
    //   }
    // }
    return target;
  } else {
    return source;
  }
}
const textObject3 = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  f: {
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } },
  },
};
textObject3.textObject3 = textObject3;
const deepResult3 = deeCloneWhile(textObject3);
console.log("deeCloneWhile", deepResult3);

```

# promise
## Promise.allSettled
**特点**
接收一个数组作为参数,数组的每一项都是一个`Promise`对象,返回一个新的`Promise`对象,只有等到参数数组的所有的`Promise`对象都发生状态改变,返回的`Promise`对象才会发生变更


```js
Promise.allSettled = function (arr) {
  let result = []
  return new Promise ((resolve,reject) => {
    arr.forEach((item,index) => {
      Promise.resolve(item).then((res) => {
        result.push({
          status:'fulfilled',
          value:res
        })
        result.length === arr.length && resolve(result)
      }).catch((error) => {
        result.push({
          status:'rejected',
          value:error
        })
        result.length === arr.length && resolve(result)
      })
    })
  })
}
```
## Promise.all()

`Promise.all()`方法用于将多个promise实例包装成一个新的Promise实例
```js
Promise.all = function (arr) {
  let index = 0, result = []
  return new Promise((resolve,reject) => {
    arr.forEach((item,i)=> {
      Promise.resolve(item).then(res=>{
        index ++ 
        result[i] = res
        if(index === arr.length) resolve(res)
      }).catch(error => reject(error))
    })
  })
}
```