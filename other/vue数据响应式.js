// defineProperty
function defineReactive(data) {
  if (!data || Object.prototype.toString.call(data) !== "[object Object]")
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
  name: "better",
  firends: ["1", "2"],
};
defineReactive(data);
console.log(data.name);
console.log(data.firends[1]);
console.log(data.firends[0]);
console.log(Object.prototype.toString.call(data));
// vue3 proxy
// const dinner = {
//   meal:'111'
// }

// const handler = {
//   get(target, prop) {
//     console.log('get...', prop)
//     return Reflect.get(...arguments)
//   },
//   set(target, key, value) {
//     console.log('get...', prop)
//     console.log('set',key,value)
//     return Reflect.set(...arguments)
//   }
// }
// const proxy = new Proxy(dinner, handler)
// console.log(proxy.meal)

function reactive(obj) {
  const handler = {
    get(target, prop, receiver) {
      track(target, prop);
      const value =  Reflect.get(...arguments);
      if(typeof value === 'Object') {
        reactive(value)
      }else {
        return value
      }
    },
    set(target,key, value, receiver) {
      trigger(target,key, value);
      return Reflect.set(...arguments);
    },
  };
  return new Proxy(obj,handler)
}
function track(data, key) {
  console.log("sue set", data, key);
}
function trigger(data, key,value) {
  console.log("sue set", key,':',value);
}
const dinner = {
  name:'haochi1'
}
const proxy  =reactive(dinner)
proxy.name
proxy.list = []
proxy.list.push(1)