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
        target[key] = deeClone(source[key]);
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
const deepResult = deeClone(textObject);
const shallowResult = shallowClone(textObject);
console.log("深克隆", deepResult);
console.log("浅克隆", shallowResult);
deepResult.field4.push(1);
console.log("深克隆", deepResult, textObject);


// 深拷贝2.0 解决循环引用问题