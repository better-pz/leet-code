function shallowClone(source) {
  const target = {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
// 深拷贝1.0
function deeClone1(source) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeClone1(source[key]);
      }
    }
    return target;
  } else {
    return source;
  }
}
const textObject = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
const deepResult = deeClone1(textObject);
const shallowResult = shallowClone(textObject);
console.log("深克隆", deepResult);
console.log("浅克隆", shallowResult);
deepResult.field4.push(1);
console.log("深克隆", deepResult, textObject);

// 深拷贝2.0 解决循环引用问题

const textObject2 = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
textObject2.textObject2 = textObject2;
// 使用1.0克隆克隆循环引用的值会出现爆栈的现象
// const deepResult2 = deeClone1(textObject2);

// 深拷贝2.0 使用Map
// 检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆
function deeCloneMap(source, map = new Map()) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    map.set(source, target);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeCloneMap(source[key],map);
      }
    }
    return target;
  } else {
    return source;
  }
}
const deepResult2 = deeCloneMap(textObject2);
console.log('mapClone', deepResult2)
// 深拷贝2.1 使用是WeakMap弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deeCloneWeakMap(source, map = new WeakMap()) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    map.set(source, target);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        // 如果属性是对象类型则递归再次遍历赋值
        target[key] = deeCloneMap(source[key],map);
      }
    }
    return target;
  } else {
    return source;
  }
}
// while循环的性能高 使用while来实现一个通用的forEach遍历，iteratee是遍历的回掉函数，他可以接收每次遍历的value和index两个参数：
function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array
}
// 深拷贝3.0 使用是WeakMap弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deeCloneWhile(source, map = new WeakMap()) {
  if (typeof source === "object") {
    const isArray = Array.isArray(source);
    let target = isArray ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(source)) {
      // 有 - 直接返回
      return map.get(source);
    }
    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    const keys = isArray ? undefined : Object.keys(source);
    map.set(source, target);
    forEach(keys || source , (value,key)=>{
      if (keys) {
        key = value
      }
      target[key] = deeCloneWhile(source[key],map);
    })
    // for (let key in source) {
    //   if (source.hasOwnProperty(key)) {
    //     // 如果属性是对象类型则递归再次遍历赋值
    //     target[key] = deeCloneMap(source[key],map);
    //   }
    // }
    return target;
  } else {
    return source;
  }
}
const textObject3 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};
textObject3.textObject3 = textObject3;
const deepResult3 = deeCloneWhile(textObject3);
console.log('deeCloneWhile', deepResult3)