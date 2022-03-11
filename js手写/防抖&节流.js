// 防抖: 当事件频繁

function debounce (fn,delay) {
  let timer = null
  return function () {
    let self = this
    let arg = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(self,arg)
    },delay)
  }
}

// 节流: 预定一个函数只有在大于等于执行周期时才执行
// 1. 使用时间戳
function throttle(fn, delay) {
  let t 
  return function () {
    let self = this
    let arg = arguments
    if(!t || Date.now() - t >= delay) {
      fn.apply(self,arg)
      t = Date.now()
    }
  }
}
// 使用定时器的思路,触发的过程中会在timer这个周期内执行, 在这个时内不断的将时间清空即可以,当时间到了之后就不能执行函数了
function throttle(fn, delay) {
  let timer = null
  return function () {
    let self = this
    let arg = arguments
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(self,arg)
        timer = null
      },delay)
    }
  }
}
