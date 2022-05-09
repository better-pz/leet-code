# Promise含义
简单来说就是一个容器,里面保存这某个未来才会结束的事件(通常是一个异步操作)的结果. 从语法来讲,Promise是一个对象,从他可以获取异步操作的消息.promise提供统一的API哥哥异步操作都可以用同样的方法进行处理
他有两个特点:
1. 对象的状态不受外部影响
三种状态`pending`(进行中), `fulfilled`(已成功), `rejected`(已失败),只有异步操作的结果可以决定当前是哪个状态,其他操作都无法改变这个状态,这也是Promise(承诺)名字的由来
2. 一旦状态改变,就不会再变,任何时候都可以的到这个结构,`Promise`对象的状态改变只有两种可能:从`pending`到`fulfilled`(已成功)和从`pending`(进行中)到`rejected`(已失败).只要这两种情况发生,状态就凝固了,不会再变了,会一直保持这个结果,这个时候就被称为`resolve`(已选型),如果改变已经发生了,再对`Promise`对象添加回调函数,也会立即得到这个结果


# 基本用法
`Promise`是一个构造函数,用来生成`Promise`实例,
```js
const promise = new Promise((resolve,reject) => {
  if(/*异步操作成功*/) {
    resolve(value)
  }else {
    reject(error)
  }
})
```
`Promsise`构造函数接收一个函数作为参数,函数有 `resolve`和`reject`两个函数作为参数
`resolve`函数的作用是将`Promise`对象的状态从未完成到成功即从`pending`变为`resolved`,在异步操作成功时调用,并将异步操作的结果
`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
`Promise`实例生成以后,可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数
```js
promise.then((value) =>{
  console.log('success',value)
}).catch((error) => {
  console.log('error',error)
})
```
# 常用的方法
## 1. Promise.all()
`Promise.all()`方法用于将多个promise实例包装成一个新的Promise实例
```js
const p = Promise.all([p1,p2,p3])'
```
如上接受参数为一个数组,数组中的每一项都是Promise实例,如果不是就会调用`Promise.resolve`方法,将参数传为Promise实例,再进一步处理.另外,Promise.all()方法的可以不是一个数组但是必须有`Iterator`接口,且返回的每个成员都是Promise实例,p的状态有p1,p2,p3决定,分成两种情况
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


### 手写
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

## 2. Promise.allSettled()
有时候希望等到一组异步操作都结束了不管每一个操作成功还是失败,再进行下一步操作,但是使用Promise.all()方法只适合所有异步操作都成功的情况,如果有一个操作失败就无法满足要求,所以在ES2020中引入了allSettled()方法来确定一组异步是否结束了(不管成功还是失败).
Promise.allSettled()方法接受一个数组作为参数,数组的每一项都是一个Promise对象,返回一个新的Promise对象,只有等到参数数组的所有的Primise对象都发生状态改变,返回的Promise对象才会发生状态变更
```js
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```
手写`Promise.allSettled`
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
## 3. Promise.resolve()
`Promise.resolve()`将现有对象转为Promise对象
```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo')
```
该方法的参数分为四种情况
1. 参数是一个Promise实例

如果参数是`Promise`实例,该方法不会做任何处理原封不动的返回这个实例

2. 参数是一个`thenable`对象

`thenable`对象指的是具有`then`方法的对象
```js
let thenable = {
  then(resolve,reject){
    resolve(42)
  }
}
```
`Promise.resolve()`会将这个对象转换成Promsie对象,然后立即执行thenable中的then方法
```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```
上面的代码中,thenable对象的then()方法执行后,对象p1的状态就变为resolved,从而立即执行最后那个then()方法指定的回调函数,输出42

3. 参数不是具有`then()`方法的对象,或者根本不是对象

如果参数是一个原始值或者是一个不带`then()`方法的对象,则返回一个新的Promise对象,状态设为`resolved`
```js
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
```
上面的代码生成一个新的Promise对象实例p,由于字符串`Hello`不属于异步操作,返回Promise实例从一生成就是`resolved`,所以回调函数会立即执行,Promise.resolve()方法的参数,会同时传给回调函数

4. 不带任何参数
直接返回一个`resolved`状态的Promise对象,如果希望得到一个Promise对象比较方便的就是直接调用Promise.resolve()方法

## 4. Promise.race()
`Promise.race()`方法也是将多个Promise实例,包装成一个新的Promise实例
```js
const p = Promise.race([p1,p2,p3])
```

手写

```js
function promiseRace(taskList) {

    return new Promise((resolve, reject) => {

        taskList.forEach(task => task.then(res => resolve(res)))
 
    })

}
```
只要数组中有一个实例率先发生改变状态,p的状态就跟这改变,那个率改变的Pormise实例的返回值就传递给评p的回调函数
## 5. Promise.any()
该方法接收一组Promise实例作为参数包装一个新的Promise实例返回
```js
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```
参数数组中的实例中只要有一个变成`fulfilled`状态,包装实例就会变成`fulfilled`状态;如果所有实例都变成`rejected`,包装实例就会变成`rejected`状态;

any和race方法很像,就是any不会因为某一个Promise变成`rejected`状态而结束,必须等到所有的Promise变成`rejected`状态而结束
```js
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];

try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
```
上面代码中，Promise.any()方法的参数数组包含三个 Promise 操作。其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。如果所有三个操作都变成rejected，那么await命令就会抛出错误。

Promise.any()抛出的错误，不是一个一般的 Error 错误对象，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误。下面是 AggregateError 的实现示例。
```js
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```
## 6. Promise.prototype.finally()
finally()方法用于指定不管Promise对象最后状态如何,都会执行的操作
```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```
如上在执行then或catch指定的回调函数以后,都会执行finally方法指定的回调函数
finally方法的回调函数不会接受任何参数,这也意味着没有办法知道前面的Promise状态的值,这表明finally方法里面的操作与状态无关

finally本质是一then方法的实例
```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```
实现

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
如上不管Promise状态如何都会执行回调函数,finally方法**总是返回原来的值**