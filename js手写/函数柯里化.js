// 指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
// 经典面试题：实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
function add() {
  const _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function() {
  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    return _args.reduce((sum, cur) => sum + cur);
  }
  return fn;
}

const result = add(1)(2,4)
console.log(result)
console.log(`add`, add(1)(2)(3) )  // 6
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15
add(2, 6)(1)                // 9
