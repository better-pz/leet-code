
# 什么是虚拟DOM

是js按照DOM的结构来创建的虚拟树形结构对象, 是对DOM的抽象, 比Dom更加轻量型
比如正式的DOM是这样的
```js
<div class="container">
  <p>哈哈</p>
  <ul class="list">
    <li>1</li>
    <li>2</li>
  </ul>
</div>
```
如果用对应的虚拟DOM表示
```js
{ 
  // 选择器
  "sel": "div",
  // 数据
  "data": {
    "class": { "container": true }
  },
  // DOM
  "elm": undefined,
  // 和 Vue :key 一样是一种优化
  "key": undefined,
  // 子节点
  "children": [
    {
      "elm": undefined,
      "key": undefined,
      "sel": "p",
      "data": { "text": "哈哈" }
    },
    {
      "elm": undefined,
      "key": undefined,
      "sel": "ul",
      "data": {
        "class": { "list": true }
      },
      "children": [
        {
          "elm": undefined,
          "key": undefined,
          "sel": "li",
          "data": {
            "text": "1"
          },
          "children": undefined
        },
        {
          "elm": undefined,
          "key": undefined,
          "sel": "li",
          "data": {
            "text": "1"
          },
          "children": undefined
        }
      ]
    }
  ]
}
```
# 虚拟dom的好处

+ 性能优化避免频繁的操作DOM.频繁操作DOM会造成重绘和重排,性能也会非常低
+ 并不是所有情况下使用虚拟DOM都提供性能,是针对在复杂项目中使用,如果简单操作使用虚拟DOM,要创建虚拟DOM,在数据修改后要先更新虚拟DOM然后再渲染成真实DOM,这个过程还是有些复杂的,所以 
+ 可以实现跨平台渲染,服务端渲染,小程序,原生应用都使用了虚拟DOM
+ 虚拟DOM可以维护程序的状态,跟踪上一次的状态
+ 使用虚拟DOM改变了当前的状态不需要立即的去更新DOM,而且更新的内容进行更新,对于没有改变的内容不做任何操作,通过前后两次差异进行比较

# diff算法
**diff算法是一个精细化比较算法**,将旧虚拟DOM和新虚拟DOM进行对比,对比出哪个虚拟节点更改了,找出了这个虚拟节点,并只更新这个虚拟节点所对应的真实节点,而不用更新其他数据数据没有发生改变的节点,实现精准地更新真实DOM,进而提高效率.


使用diff算法进行比较新老虚拟dom

## 只比较同一层级,不跨级比较

即使是同一片虚拟节点,但是跨层了,那就删除旧的节点插入新的

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a1d7d54f42c453d8e7ca09e7718a72e~tplv-k3u1fbpfcp-watermark.image?)

## 只有是同一个虚拟节点,才进行精细化比较
判断端选择器相同且key相同的时候才进行精细化比较,否则就是暴力删除旧的插入新的
## 比较标签名
  标签名不同,直接删除,不继续深度比较
  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fc6b71c2f9f4e069f878e816ac66f97~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)
## 比较key
标签名相同,key相同,就认为是相同节点不继续深度比较,比如我们在写v-for的时候会比较key,不写key就会报错,就是diff算法需要比较key

**key的作用**
比如有一个列表,我们需要在其中插入一个元素

如果不使用key或者使用的key是数组的index的话,整个元素列表的在插入元素后列表得key发生了变化,在比较key之后发生变化的key的节点会重新渲染,如果使用的是key是绑定的唯一值的情况就不会出现这种情况


**总结**
+ key的作用主要是为了更高效的DOM,因为它可以非常精准的找到相同的节点,因此在patch过程会非常高效
+ Vue字啊patch过程中会哦按段两个节点是不是相同的节点,key是一个必要条件,如果不写key,vue在比较的时候,就可能会导致频繁更新元素,使整个patch过程比较低效影响性能
+ 从源码可以知道 Vue判断两个节点是相同时主要判断两者的元素类型和key等,如果不设置key,就可能永远认为这两个是相同的节点,只能去做更行操作,就造成大量的不必要的DOM更新操作,明显是不可取的

![qKD8UWMaGSvtNgwIuNWaVw==.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bcff89b5bdf432ea0e478ececdc74ce~tplv-k3u1fbpfcp-watermark.image?)

# 核心原理
通过h函数来实现的,h函数就是用来创建虚拟dom,patch函数(用来比较新就虚拟DOM更新视图)

## h函数
h函数的主要作用就是创建虚拟节点
在h函数中使用了vnode函数,这个函数功能就是把传入的参数作为对象返回

h函数是可以嵌套使用的,从而得到虚拟DOM树


```js
/* vnode.js */

/**
 * 把传入的 参数 作为 对象返回
 * @param {string} sel 选择器
 * @param {object} data 数据
 * @param {array} children 子节点
 * @param {string} text 文本
 * @param {dom} elm DOM
 * @returns object
 children和text只能有一个
 */
export default function (sel, data, children, text, elm) {
  return { sel, data, children, text, elm }
}


```
如果实现三个参数的h函数

```js
/* h.js */

// 导入 vnode
import vnode from './vnode'

// 导出 h 方法
// 这里就实现简单3个参数 参数写死
/**
 *
 * @param {string} a sel
 * @param {object} b data
 * @param {any} c 是子节点 可以是文本，数组
 */
export default function h(a, b, c) {
  // 先判断是否有三个参数
  if (arguments.length < 3) throw new Error('请检查参数个数')
  // 第三个参数有不确定性 进行判断
  // 1.第三个参数是文本节点
  if (typeof c === 'string' || typeof c === 'number') {
    // 调用 vnode 这直接传 text 进去
    // 返回值 {sel,data,children,text,elm} 再返回出去
    return vnode(a, b, undefined, c, undefined)
  } // 2.第三个参数是数组 [h(),h()] [h(),text] 这些情况
  else if (Array.isArray(c)) {
    // 然而 数组里必须是 h() 函数
    // children 用收集返回结果
    let children = []
    // 先判断里面是否全是 h()执行完的返回结果 是的话添加到 chilren 里
    for (let i = 0; i < c.length; i++) {
      // h() 的返回结果 是{} 而且 包含 sel
      if (!(typeof c[i] === 'object' && c[i].sel))
        throw new Error('第三个参数为数组时只能传递 h() 函数')
      // 满足条件进行push [{sel,data,children,text,elm},{sel,data,children,text,elm}]
      children.push(c[i])
    }
    // 调用 vnode 返回 {sel,data,children,text,elm} 再返回
    return vnode(a, b, children, undefined, undefined)
  } // 3.第三个参数直接就是函数 返回的是 {sel,data,children,text,elm}
  else if (typeof c === 'object' && c.sel) {
    // 这个时候在 使用h()的时候 c = {sel,data,children,text,elm} 直接放入children
    let children = [c]
    // 调用 vnode 返回 {sel,data,children,text,elm} 再返回
    return vnode(a, b, children, undefined, undefined)
  }
}


```

原理就是使用嵌套不断地收集`{sel,data,children,text,elm}`,children里面再套`{sel,data,children,text,elm}`



## patch函数 (Diff算法核心)
源码中patch函数主要接受四个参数
+ oldVnode:老的虚拟DOM节点
+ vnode:新的虚拟DOM节点
+ hydrating:是不是要和真实DOM混合,服务器渲染的会用
+ removeOnly:transition-group会用到
逻辑流程
1. `vnode`不存在,`oldVnode`存在,就删掉`oldVnode`
2. `vnode`存在,`oldVnode`不存在,就创建`vnode`
3. 两个都存在的话,通过`sameVnode`函数对比是不是同一节点
     + 如果是同一节点的话`patchVnode`进行后续的对比节点变化或子节点变化
     + 如果是同一节点,把`vnode`挂载到`oldVnode`的父元素下
       + 如果组件的根节点被替换,就遍历更新父节点,然后删掉旧的节点
       + 如果是服务端渲染就用`hydrating`把`oldVnode`和真实DOM混合
```js
/* patch.js */

// 导入 vnode
import vnode from './vnode'
// 导出 patch
/**
 *
 * @param {vnode/DOM} oldVnode
 * @param {vnode} newVnode
 */
export default function patch(oldVnode, newVnode) {
  // 1.判断oldVnode 是否为虚拟 DOM 这里判断是否有 sel
  if (!oldVnode.sel) {
    // 转为虚拟DOM
    oldVnode = emptyNodeAt(oldVnode)
  }
  // 判断 oldVnode 和 newVnode 是否为同一虚拟节点
  // 通过 key 和 sel 进行判断
  if (sameVnode(oldVnode, newVnode)) {
    // 是同一个虚拟节点 调用我们写的 patchVnode.js 中的方法
    patchVnode(oldVnode,Vnode,insertedVnodeQueue)
    ...
  } else {
    // 不是同一虚拟个节点 直接暴力拆掉老节点，换上新的节点
    ...
    // 插入到老节点之前
    let newVnodeElm = createElement(newVnode)
    if(oldVnode.elm.parentVnode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm.odlVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeCild(oldVnode)
  }
  newVnode.elm = oldVnode.elm

  // 返回newVnode作为 旧的虚拟节点
  return newVnode
}

/**
 * 转为 虚拟 DOM
 * @param {DOM} elm DOM节点
 * @returns {object}
 */
function emptyNodeAt(elm) {
  // 把 sel 和 elm 传入 vnode 并返回
  // 这里主要选择器给转小写返回vnode
  // 这里功能做的简陋，没有去解析 # .
  // data 也可以传 ID 和 class
  return vnode(elm.tagName.toLowerCase(), undefined, undefined, undefined, elm)
}


```
### createElement
创建节点的方法

```js
// 真正创建节点,将vnode创建为DOM
function createElement (vnode) {
  // 目的就是将vnode创建为DOM
  // 创建一个新的DOM节点
  let domNode = document.createElement*=(vnode.sel)
    // 存在子节点
    // 子节点是文本
  if (
    vnode.text !== '' &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 直接添加文字到 node 中
    domNode.innerText = vnode.text
    // 补充elm属性
    vnode.elm = domNode

    
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 子节点是数组(有子节点),需要递归创建
    for(let i = 0,i< vnode.children.length; i++ ) {
      let ch =vnode,children[i]
      let chDOM = createElement(ch)
      domNode.appenChild(chDOM)
    }
  }

  // 返回elm,elm属性是一个纯DOM对象
  return vnode.elm

}
```
### sameVnode函数
**判断是否为同一类型节点**,明确什么算是同一类型节点
核心代码中有体现
```js
function sameVnode(oldVnode,newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同

  )
}
```


比较为相同的节点

+ key值是否一样
+ 标签签名是否一样
+ 是否都为注释节点
+ 是否都定义了data
+ 当标签为input时,type是否相同
+ 
### patchVnode函数

这个是在新的vnode和oldVnode是同一节点的情况下,才会执行的函数,主要是对比节点文本变化或子节点变化

思考的逻辑

1. 如果新的vnode无text(有children)
   1. 两个都有children 
   2. 新的有children,老的无chiildren(有text):清空text,添加新的children
   3. 新的无children,老的有children 无text: 移除children
   4. 老的有text:清空text
2. 如果新的vnode有text,如果oldVnode的text不等于新的vnode text,如果oldVndoe text有children 移除老的vnode children,将old text设置成newText


这个函数功能

+ 找到对应的真实DOM,称为el
+ 判断vnode和oldVnode是否指向同一个对象,即两者的引用地址是一样的,就表示节点没有变化,直接返回
+ 如果oldVnode的isAsyncPlaceholder存在,就跳过异步组件的检查,直接返回
+ 如果oldVnode和vnode都是静态节点,并且有一样的key,并且vnode是克隆节点或者v-once指令控制的节点时,把oldVnode.elm和oldVnode.child都复制到vnode上,然后返回
+ 如果vnode不是文本节点也不是注释节点的情况下
  + 如果vnode和oldVnode都有子节点,调用的updateChildren更新
  + 如果只有vnode有子节点,就调用addVnodes删除该子节点
  + 如果vnode文本是undefined,就删除vnode.elm文本
+ 如果vnode是文本节点但是和oldVnode文本内容不一样,就更新文本


```js
  function patchVnode (
    oldVnode, // 老的虚拟 DOM 节点
    vnode, // 新的虚拟 DOM 节点
    insertedVnodeQueue, // 插入节点的队列
    ownerArray, // 节点数组
    index, // 当前节点的下标
    removeOnly // 只有在
  ) {
    // 新老节点引用地址是一样的，直接返回
    // 比如 props 没有改变的时候，子组件就不做渲染，直接复用
    if (oldVnode === vnode) return
    
    // 新的 vnode 真实的 DOM 元素
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = vnode.elm = oldVnode.elm
    // 如果当前节点是注释或 v-if 的，或者是异步函数，就跳过检查异步组件
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
      } else {
        vnode.isAsyncPlaceholder = true
      }
      return
    }
    // 当前节点是静态节点的时候，key 也一样，或者有 v-once 的时候，就直接赋值返回
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance
      return
    }
    // hook 相关的不用管
    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }
    // 获取子元素列表
    const oldCh = oldVnode.children
    const ch = vnode.children
    
    if (isDef(data) && isPatchable(vnode)) {
      // 遍历调用 update 更新 oldVnode 所有属性，比如 class,style,attrs,domProps,events...
      // 这里的 update 钩子函数是 vnode 本身的钩子函数
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      // 这里的 update 钩子函数是我们传过来的函数
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    // 如果新节点不是文本节点，也就是说有子节点
    if (isUndef(vnode.text)) {
      // 如果新老节点都有子节点
      if (isDef(oldCh) && isDef(ch)) {
        // 如果新老节点的子节点不一样，就执行 updateChildren 函数，对比子节点
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        // 如果新节点有子节点的话，就是说老节点没有子节点
        
        // 如果老节点文本节点，就是说没有子节点，就清空
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        // 添加子节点
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        // 如果新节点没有子节点，老节点有子节点，就删除
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        // 如果老节点是文本节点，就清空
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      // 新老节点都是文本节点，且文本不一样，就更新文本
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      // 执行 postpatch 钩子
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }

```
### updateChildren

diff算法的子节点更新策略

这个是新的vnode和oldVnode都有子节点,且子节点不一样的时候进行对比子节点的函数
作用:新旧虚拟节点的子节点对比,`收尾指针法`,新的子阶段集合和旧的子节点集合,各个收尾两个指针

比如循环遍历两个列表,循环停止条件是:其中一个列表的开始指针start和结束指针end重合

**diff算法优化策略是四种命中查找**
循环的内容是: 
  + 新的头和老的头对比
  + 新的尾和老的尾对比
  + 新的头和老的尾对比 
  + 新的尾和老的头对比

以上四种只要有一种判断相等,就调用patchVnode对别节点变化或子节点变化,然后移动对比的下标,继续下一轮循环对比

如果以上逻辑都匹配不到,在所有旧子节点的key做一个映射到旧节点下标的`key->index`表,然后用新的vnode的key去找出在旧节点中可以复用的位置

+ 如果没有找到,就创建一个新的节点
+ 如果找到了,再对比标签是否是同一节点
  + 如果是同一节点,就调用patchVnode进行后续比较,然后把这个节点插入到老的开始指针前面,并且移动新的开始下标,继续下一轮循环对比
  + 如果不是相同节点,就创建一个新的节点
+ 如果老的vnode先遍历完,就添加新的vnode没有遍历的节点
+ 如果新的vnode先遍历完,就删除老的vnode没有遍历的节点
  
```js
/* updateChilren.js */

// 导入 createElm patchVnode sameVnode
import createElm from './createElm'
import patchVnode from './patchVnode'
import sameVnode from './sameVnode'

// 导出 updateChildren
/**
 *
 * @param {dom} parentElm 父节点
 * @param {array} oldCh 旧子节点
 * @param {array} newCh 新子节点
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  // 下面先来定义一下之前讲过的 diff 的几个指针 和 指针指向的 节点
  // 旧前 和 新前
  let oldStartIdx = 0,
    newStartIdx = 0
  let oldEndIdx = oldCh.length - 1 //旧后
  let newEndIdx = newCh.length - 1 //新后
  let oldStartVnode = oldCh[0] //旧前 节点
  let oldEndVnode = oldCh[oldEndIdx] //旧后节点
  let newStartVnode = newCh[0] //新前节点
  let newEndVnode = newCh[newEndIdx] //新后节点
  let keyMap = null //用来做缓存
  // 写循环条件
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log('---进入diff---')

    // 下面按照 diff 的4种策略来写 这里面还得调用 pathVnode
    // patchVnode 和 updateChildren 是互相调用的关系，不过这可不是死循环
    // 指针走完后就不调用了

    // 这一段都是为了忽视我们加过 undefined 节点，这些节点实际上已经移动了
    if (oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx]
    }
    // 忽视了所有的 undefined 我们这里来 判断四种diff优化策略
    // 1.新前 和 旧前
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      console.log('1命中')
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldStartVnode, newStartVnode)
      // 指针移动
      newStartVnode = newCh[++newStartIdx]
      oldStartVnode = oldCh[++oldStartIdx]
    } // 2.新后 和 旧后
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      console.log('2命中')
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldEndVnode, newEndVnode)
      // 指针移动
      newEndVnode = newCh[--newEndIdx]
      oldEndVnode = oldCh[--oldEndIdx]
    } // 3.新后 和 旧前
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      console.log('3命中')
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldStartVnode, newEndVnode)
      // 策略3是需要移动节点的 把旧前节点 移动到 旧后 之后
      // insertBefore 如果参照节点为空，就插入到最后 和 appendChild一样
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      // 指针移动
      newEndVnode = newCh[--newEndIdx]
      oldStartVnode = oldCh[++oldStartIdx]
    }
    // 4.新前 和 旧后
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      console.log('4命中')
      // 调用 patchVnode 对比两个节点的 对象 文本 children
      patchVnode(oldEndVnode, newStartVnode)
      // 策略4是也需要移动节点的 把旧后节点 移动到 旧前 之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      // 指针移动
      newStartVnode = newCh[++newStartIdx]
      oldEndVnode = oldCh[--oldEndIdx]
    } else {
      console.log('diff四种优化策略都没命中')
      // 当四种策略都没有命中
      // keyMap 为缓存，这样就不用每次都遍历老对象
      if (!keyMap) {
        // 初始化 keyMap
        keyMap = {}
        // 从oldStartIdx到oldEndIdx进行遍历
        for (let i = oldStartIdx; i < oldEndIdx; i++) {
          // 拿个每个子对象 的 key
          const key = oldCh[i].data.key
          // 如果 key 不为 undefined 添加到缓存中
          if (!key) keyMap[key] = i
        }
      }

      // 判断当前项是否存在 keyMap 中 ,当前项时 新前(newStartVnode)
      let idInOld = keyMap[newStartIdx.data]
        ? keyMap[newStartIdx.data.key]
        : undefined

      // 存在的话就是移动操作
      if (idInOld) {
        console.log('移动节点')
        // 从 老子节点 取出要移动的项
        let moveElm = oldCh[idInOld]
        // 调用 patchVnode 进行对比 修改
        patchVnode(moveElm, newStartVnode)
        // 将这一项设置为 undefined
        oldCh[idInOld] = undefined
        // 移动 节点 ,对于存在的节点使用 insertBefore移动
        // 移动的 旧前 之前 ，因为 旧前 与 旧后 之间的要被删除
        parentElm.insertBefore(moveElm.elm, oldStartVnode.elm)
      } else {
        console.log('添加新节点')
        // 不存在就是要新增的项
        // 添加的节点还是虚拟节点要通过 createElm 进行创建 DOM
        // 同样添加到 旧前 之前
        parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm)
      }

      // 处理完上面的添加和移动 我们要 新前 指针继续向下走
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 我们添加和删除操作还没做呢
  // 首先来完成添加操作 新前 和 新后 中间是否还存在节点
  if (newStartIdx <= newEndIdx) {
    console.log('进入添加剩余节点')
    // 这是一个标识
    // let beforeFlag = oldCh[oldEndIdx + 1] ? oldCh[oldEndIdx + 1].elm : null
    let beforeFlag = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1] : null
    // new 里面还有剩余节点 遍历添加
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // newCh里面的子节点还需要 从虚拟DOM 转为 DOM
      parentElm.insertBefore(createElm(newCh[i]), beforeFlag)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('进入删除多余节点')
    // old 里面还有剩余 节点 ,旧前 和 旧后 之间的节点需要删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      // 删除 剩余节点之前 先判断下是否存在
      if (oldCh[i].elm) parentElm.removeChild(oldCh[i].elm)
    }
  }
}


```

# vue3 虚拟dom
+ 事件缓存
+ 添加静态标记
+ 静态提升
+ 使用最长递增子序列优化了对比流程:Vue2在updateChildren()函数里对比变更,Vue3中这一块逻辑在patchKeyChildren()函数里

## 事件缓存