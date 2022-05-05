# 描述Vue与React区别
说明概念:
vue:是一套用于构建用户界面的**渐进式框架**,Vue 的核心库只关注视图层
react:用于构建用户界面的 JavaScript 库 声明式, 组件化

1. 定位
+ vue 渐进式 响应式
+ React 单向数据流

2. 写法
vue:template,jsx
react: jsx

3. Hooks:vue3 和react16支持hook

4. UI更新

5. 文化
vue 官方提供
React 第三方提供,自己选择
# 描述vue的响应式原理


![impicture_20220320_171230.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fdfa92e3d31452fac5fdc10e92067c6~tplv-k3u1fbpfcp-watermark.image?)
## Vue 的三个核心类
1. `Observer` :给对象的属性添加getter 和setter ,用于**依赖收集**和**派发更新**
2. `Dep` :用于收集当前响应式对象的依赖关系,每个响应式对象都有dep实例,`dep.subs = watcher[]`,当数据发生变更的时候,会通过`dep.notify()`通知各个watcher
3. `watcher`:是一个中介,数据发生变化时通过watcher中转,通知组件 观察者对象,render watcher,computed watcher, user watcher

* 依赖收集
+ 需要用到数据的地方,称为依赖
+ 在`getter`中收集依赖,在`setter`中触发依赖

1. `initState`, 对computed属性初始化时,会触发`computed` `watcher` 依赖收集
2. `initState`, 对监听属性初始化的时候,触发`user` `watcher` 依赖收集
3. `render`,触发`render` `watcher` 依赖收集
 
* 派发更新
`Object.defindeProperty`
1. 组件中对响应式的数据进行了修改,会触发setter逻辑
2. `dep.notify()`
3. 遍历所有subs,调用每一个watcher的update方法
总结:
当创建一个vue实例时, vue会遍历data里的属性, Objeect.defineProperty 为属性添加getter和setter对数据的读取进行劫持
getter:依赖收集
setter:派发更新
每个组件的实例都有对应的watcher实例

# 计算属性的原理
computed watcher 计算属性的监听器,格式化转换,求值等操作

computed watcher 持有一个dep实例,通过dirty属性标记计算属性是否需要重新求值
当computed依赖值改变后,就会通知订阅的watcher进行更新,对于computed watcher 会将dirty属性设置为true,并且进行计算属性方法的调用, 
## 注意
1. 计算属性是基于他的响应式依赖进行缓存的,只有依赖发生改变的时候才会重新求值
2. 意义:比如计算属性方法内部操作非常频繁时,遍历一个极大的数组,计算一次可能要耗时1s,如果依赖值没有变化的时候就不会重新计算

# nextTick原理
## 概念
nextTick的作用是在下一次DOM更新循环结束后,执行延迟回调,nextTick就是创建一个异步任务,要他等到同步任务执行完后才执行
## 使用
在数据变化后要执行某个操作,而这个操作依赖因数据的改变而改变dom,这个操作应该放到nextTick中
## vue2
```js
<template>
  <div>{{ name }}</div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    }
  },
  mounted() {
    console.log(this.$el.clientHeight) // 0
    this.name = "better"
    console.log(this.$el.clientHeight) // 0
    this.$nextTick(() => {
      console.log(this.$el.clientHeight) // 18
    });
  }
};
</script>
```
我们发现直接获取最新的DOM相关的信息是拿不到的,只有在nextTick中才能获取罪行的DOM信息

### 原理分析

在执行this.name = 'better' 会触发Watcher更新, Watcher会把自己放到一个队列,然后调用nextTick()函数
> 使用队列的原因:
比如多个数据变更更新视图多次的话,性能上就不好了, 所以对视图更新做一个异步更新的队列,避免重复计算和不必要的DOM操作,在下一轮时间循环的时候刷新队列,并执行已去重的任务(nextTick的回调函数),更新视图
```js
export function queueWatcher (watcher: Watcher) {
  ...
  // 因为每次派发更新都会引起渲染，所以把所有 watcher 都放到 nextTick 里调用
  nextTick(flushSchedulerQueue)
}

```
这里的参数`flushSchedulerQueue`方法就会被放入事件循环中,主线程任务执行完后就会执行这个函数,对watcher队列排序,遍历,执行watcher对应的run方法,然后render,更新视图
也就是在执行this.name = 'better'的时候,任务队列可以理解为[flushSchedulerQueue],然后在下一行的console.log,由于会更新视图任务`flushSchedulerQueue`在任务队列中没有执行,所以无法拿到更后的视图
然后在执行this.$nextTick(fn)的时候,添加一个异步任务,这时的任务队列可以理解为[flushSchedulerQueue, fn], 然后同步任务执行完了,接着按顺序执行任务队列里的任务, 第一个任务执行就会更新视图,后面自然能得到更新后的视图了

### nextTick源码
源码分为两个部分:一个是判断当前环境能使用的最合适的API并保存异步函数,二是调用异步函数执行回调队列
**1 环境判断**
主要是判断用哪个宏任务或者微任务,因为宏任务的消耗时间是大于微任务的,所以先使用微任务, 用以下的判断顺序
+ promise
+ MutationObserver
+ setImmediate
+ setTimeout

```js

export let isUsingMicroTask = false // 是否启用微任务开关
const callbacks = [] // 回调队列
let pending = false // 异步控制开关，标记是否正在执行回调函数

// 该方法负责执行队列中的全部回调
function flushCallbacks () {
  // 重置异步开关
  pending = false
  // 防止nextTick里有nextTick出现的问题
  // 所以执行之前先备份并清空回调队列
  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 执行任务队列
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
let timerFunc // 用来保存调用异步任务方法
// 判断当前环境是否支持原生 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 保存一个异步任务
  const p = Promise.resolve()
  timerFunc = () => {
    // 执行回调函数
    p.then(flushCallbacks)
    // ios 中可能会出现一个回调被推入微任务队列，但是队列没有刷新的情况
    // 所以用一个空的计时器来强制刷新任务队列
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 不支持 Promise 的话，在支持MutationObserver的非 IE 环境下
  // 如 PhantomJS, iOS7, Android 4.4
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 使用setImmediate，虽然也是宏任务，但是比setTimeout更好
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 以上都不支持的情况下，使用 setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

```

环境判断结束就会得到一个延迟回调函数`timerFunc`
然后进入核心的nextTick

 **2 nextTick()函数源码**
在使用的时候就是调用nextTick()这个方法
+ 把传入的回调函数放进回调队列callbacks
+ 执行保存的异步任务timerFunc,就会遍历callbacks执行相应的回调函数了
```js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 把回调函数放入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    // 如果异步开关是开的，就关上，表示正在执行回调函数，然后执行回调函数
    pending = true
    timerFunc()
  }
  // 如果没有提供回调，并且支持 Promise，就返回一个 Promise
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```
可以看到最后有返回一个Promise,是可以让我们在不传参的时候用
```js
this.$nextTick().then(()=>{ ... })
```


## vue3

点击按钮更新DOM内容, 并获取最新的DOM内容

```js
 <template>
     <div ref="test">{{name}}</div>
     <el-button @click="handleClick">按钮</el-button>
 </template>
 <script setup>
     import { ref, nextTick } from 'vue'
     const name = ref("better")
     const test = ref(null)
     async function handleClick(){
         name.value = '掘金'
         console.log(test.value.innerText) // better
         await nextTick()
         console.log(test.value.innerText) // 掘金
     }
     return { name, test, handleClick }
 </script>

```

在使用方式上面有了一些变化,事件循环的原理还是一样的,只是加了几个专门维护队列的方法,以及关联到effect 

### vue3 nextTick源码剖析
```js
const resolvedPromise: Promise<any> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null

export function nextTick<T = void>(this: T, fn?: (this: T) => void): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```
简单来看就是一个Promise
nextTick接受一个函数为参数,同时会创建一个微任务,在我们页面调用nextTick的时候,会执行该函数,把我们的参数fn赋值给p.then(fn) ,在队列的任务完成后, fn就执行了
由于加了几个维护队列的方法,所以执行顺序是
`queueJob` -> `queueFlush` -> `flushJobs` -> nextTick参数的fn

**flushJobs**
该方法主要负责处理队列任务,主要逻辑如下
+ 先处理前置任务队列
+ 根据Id排列队列
+ 遍历执行队列任务
+ 执行完毕后清空并重置队列
+ 执行后置队列任务
+ 如果还有就递归继续执行

# vue Router
 路由就是一组key-value的对应关系,在前端项目中说的路由可以理解为url-视图之间的映射关系,这种映射是单向的,url变化不会走http请求,但是会更新切换前端UI视图,像vue这种单页面应用 就是这样的规则.
## 路由守卫

1. 全局路由守卫
+ 前置路由守卫: `beforeEach` 路由切换之前被调用

+ 全局解析守卫:`beforeResolve`
在每次导航时就会触发,但是确保在导航被确认之前,同时在所有组件内守卫和异步路由组件被解析之后2,解析守卫就被正确调用,如确保用户可以访问自定义meta属性`requiresCamera` 的路由：
```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```


`router.beforeResolve` 是获取数据或执行任何其他操作（**如果用户无法进入页面时你希望避免执行的操作**）的理想位置。


+ 后置路由守卫 :`afterEach` 路由切换之后被调用`requiresCamera` 的路由：

2. 独享路由守卫
```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
            // ...
            }
        }
    ]
})
```

3.  组件內路由守卫
可以在组件内使用者两个钩子
+ 通过路由规则,进入该组件时被调用
```js
beforeRouteEnter (to, from, next) {

}
```

+ 通过路由规则,离开该组件时调用 
```js
beforeRouteLeave (to, from, next) {

}
```

## 完整的导航解析过程
1.  导航被触发。
2.  在失活的组件里调用 `beforeRouteLeave` 守卫。
3.  调用全局的 `beforeEach` 守卫。
4.  在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5.  在路由配置里调用 `beforeEnter`。
6.  解析异步路由组件。
7.  在被激活的组件里调用 `beforeRouteEnter`。
8.  调用全局的 `beforeResolve` 守卫(2.5+)。
9.  导航被确认。
10.  调用全局的 `afterEach` 钩子。
11.  触发 DOM 更新。
12.  调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。
## 路由模式
1. history模式 `/`:
    使用`pushState`和`replaceState`,通过这两个API可以改变url地址不发生请求,`popState`事件

2. hash模式`#` :

    hash是URL中hash(#)及后面的那部分,常用作锚点在页面内进行导航,改变hash值不会随着http请求发送给服务器,通过`hashChange`事件监听URL的变化,可以用他来实现更新页面部分内容的操作
## vueRouter的实现
### 剖析VueRouter本质
通过使用vueRouter可以知道
1. 通过new Router() 获得一个router实例,我门引入的VueRouter其实就是一个类
```js
class VueRouter {
}
```
2. 使用Vue.use(),而Vue.use的一个原则就是执行对象的install这个方法,所有,我们可以再一步假设VueRouter有install这个方法
所以得出
```js
//myVueRouter.js
class VueRouter{

}
VueRouter.install = function () {
    
}

export default VueRouter

```
### 分析Vue.use
Vue.use(plugin)
用法:
    用于安装vue.js插件,如果插件是一个对象,必须提供install方法,如果插件是一个函数,它会被作为install方法,调用install方法的时候,会将vue作为参数传入,install方法被同一个插件多次调用时,插件也只会被安装一次
    
作用:
    注册插件,此时只需要调用install方法并将Vue作为参数传入
    1. 插件的类型,可以是install方法,也可以是一个包含install方法的对象
    2. 插件只能被安装一次,保证插件列表中不能有重复的插件
    
需要将Vue作为install方法第一个参数传入,先将Vue保存起来,将传进来的Vue创建两个组件router-link和router-view
```js
//myVueRouter.js
let Vue = null;
class VueRouter{

}
VueRouter.install = function (v) {
    Vue = v;
    console.log(v);

    //新增代码
    Vue.component('router-link',{
        render(h){
            return h('a',{},'首页')
        }
    })
    Vue.component('router-view',{
        render(h){
            return h('h1',{},'首页视图')
        }
    })
};

export default VueRouter


```
install一般是给每个vue实例添加东西的,路由中就是添加$router和$route,注意:每个组件添加的$router是同一个和$route是同一个,避免只是根组件有这个router值,使用代理的思想
```js
//myVueRouter.js
let Vue = null;
class VueRouter{

}
VueRouter.install = function (v) {
    Vue = v;
    // 新增代码
    Vue.mixin({
        beforeCreate(){
            if (this.$options && this.$options.router){ // 如果是根组件
                this._root = this; //把当前实例挂载到_root上
                this._router = this.$options.router;
            }else { //如果是子组件
                this._root= this.$parent && this.$parent._root
            }
            Object.defineProperty(this,'$router',{
                get(){
                    return this._root._router
                }
            })
        }
    })

    Vue.component('router-link',{
        render(h){
            return h('a',{},'首页')
        }
    })
    Vue.component('router-view',{
        render(h){
            return h('h1',{},'首页视图')
        }
    })
};

export default VueRouter


```
完善VueRouter类
首先明确下是实例化的时候传的参数为mode(路由模式), routes(路由表),在类的构造器中传参
```js
class VueRouter{
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
    }
}

```
但是我们直接处理routes的十分不方便的，所以我们先要转换成key：value的格式
```js
createMap(routes) {
    return routes.reduce((pre,current) => {
        pre[current.path] = current.component
        return pre
    },{})
}
```

[手写vueRouter](https://juejin.cn/post/6854573222231605256)


