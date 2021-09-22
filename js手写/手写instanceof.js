function myInstanceof (left, right) {
  left = left.__proto__
  var prototype = right.prototype
  while (true) {
      if (left ==null ) return false
      if (left === prototype) return true
      left = left.__proto__
  }
}
function Foo () {}
var f = new Foo()
console.log(myInstanceof(f, Foo)); // true
console.log(myInstanceof(f, Object)); // true
console.log(myInstanceof([1,2], Array)); // true
console.log(myInstanceof({ a: 1 }, Array)); // false
console.log(myInstanceof(Array,Object))
console.log(Array instanceof Object)
