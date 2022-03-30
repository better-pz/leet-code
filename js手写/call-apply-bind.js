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

// bind函数的三个特点
// 1. 改变this指向
// 2. 第一个参数是this,后面的参数是函数接受参数的值
// 3. 返回值不变
function text (a,b,c) {
  console.log(a,b,c)
  console.log('this',this)
  return '我是better'
}
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






const result = text(1,10,100)
const bindResult = text.mybind({name:'better'},7,77,777)(1)
console.log('手写bind',result,bindResult)


// call apply测试数据
let Person = {
  name: 'Tom',
  say(name1,name2) {
      console.log(this)
      console.log(`我叫${this.name}参数获取的name${name1}和${name2}`)
  }
}


Person1 = {
  name: 'Tom1'
}
Person.say.myCall(Person1,'jerry1','jerry2')
Person.say.myApply(Person1,['jerry1','jerry2'])
