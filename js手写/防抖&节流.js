function debounce(handle, delay, immediate) {
  let timer = null;
  return function() {
    timer && clearTimeout(timer);
    const self = this;
    const args = [...arguments];
    // 需要立即执行
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        handle.call(self, ...args);
        timer = null; // 定时将timer清空为null 下次触发时callNow为true可以直接理解执行handle
      }, delay);
      if (callNow) handle.call(self, ...args);
    } else {
      timer = setTimeout(() => {
        handle.call(self, ...args);
      }, delay);
    }
  };
}

function throttle(handle, delay, immediate) {
  if (immediate) {
    let previous = 0;
    return function() {
      let now = Date.now();
      const self = this;
      const args = [...arguments];
      if (!previous || now - previous >= delay) {
        handle.call(self, ...args);
        previous = now;
      }
    };
  } else {
    let timer;
    return function() {
      const self = this;
      const args = [...arguments];
      if (timer) return;
      timer = setTimeout(() => {
        handle.call(self, ...args);
        timer = null;
      }, delay);
    };
  }
}
