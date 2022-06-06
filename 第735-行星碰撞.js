// [5, 10, -5]      [5, 10]
// [8, -8]  []
// [10, 2, -5]  [10]
// [-2, -1, 1, 2]  [-2, -1, 1, 2]


function fn(params) {
  const stack = []
  for(let i = 0; i < params.length; i++) {
    const curr = params[i]
    let top = stack.slice(-1)[0]
    if(top > 0 && curr < 0 ) {
      while (top>0 && stack.length && top<-curr) {
        stack.pop()
        top = stack.slice(-1)[0]
      }
      if(top === -curr) {
        stack.pop()
      }else if(top < 0 || !top) {
        stack.push(curr)
      }
    }else {
      stack.push(curr)
    }
  }
  return stack
}
console.log(fn([5, 10, -5]))
console.log(fn([8, -8]))
console.log(fn([10, 2, -5]))
console.log(fn([-2, -1, 1, 2] ))
console.log(fn([-2] ))
console.log(fn([] ))