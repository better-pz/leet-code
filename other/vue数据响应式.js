// defineProperty
function defineReactive(data) {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]')
    return;
  for (let key in data) {
    let val = data[key];
    Object.defineProperty(data, key, {
      enumerable: true, //可枚举
      configurable: true, //可配置
      get: function() {
        track(data, key);
        return val;
      },
      set: function() {
        trigger(val, key);
      },
    });
    if (typeof val === "object") {
      defineReactive(val);
    }
  }
}
function trigger(val, key) {
  console.log("sue set", val, key);
}
function track(val, key) {
  console.log("sue set", val, key);
}


const data = {
  name:'better',
  firends:['1','2']
}
defineReactive(data)
console.log(data.name)
console.log(data.firends[1])
console.log(data.firends[0])
console.log(Object.prototype.toString.call(data))
// vue3 proxy
