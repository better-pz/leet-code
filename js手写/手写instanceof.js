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
