const arr = [1, [2, [3, [4, 5]]], 6];
const arr2 = [1, [2, 3, 4, 5, 6]];
// arr.reduce((acc, val) => acc.concat(val), []);
// console.log(arr);

// function flatten (arr,deep=1) {

// console.log(deep);
//  return   arr.reduce((acc,val) => acc.concat(Array.isArray(val)? flatten(val,deep-1):val),[])

// }
// function flatten(arr) {
//   return arr.toString().split(',').map(item =>parseFloat(item))
// }


// 循环递归

function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i])
    }
  }
  return result
}



// function flatten(arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr);
//     //arr = Array.prototype.concat.apply([],arr);
//   }
//   return arr;
// }

// function flatten(arr) {
//   while (arr.some(item=> Array.isArray(item))) {
//     console.log(...arr)
//     arr = [].concat(...arr)
//     console.log(arr)
//   }
//   return arr
// }


// function flatten (arr) {
//   console.log('JSON.stringify(arr)', typeof JSON.stringify(arr))
//   let str= JSON.stringify(arr).replace(/(\[|\])/g, '');
//   str = '[' + str + ']';
//   arr = JSON.parse(str);
//   return arr
// }
console.log(flatten(arr))