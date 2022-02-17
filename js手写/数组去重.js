// 1. 双层循环        
function distinct (array) {
  for (let i = 0;i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if(array[i] == array[j]) {
        arr.splice(i,1)
        i--
      }
    }
  }
}



// 2. 利用indexOf检测元素在数组中第一次出现的位置是否和元素在的位置相等,如果不相等则是重复元素
// function distinct (array) {
//   array = array.filter((item,index) => {
//    return array.indexOf(item) === index
//   })
//   console.log(111,array)
// }

// set数据结构
// function  distinct (array) {
//   return Array.from(new Set(array))
// }
const arr = [6,7,9,9,8,7,5]
distinct(arr)
console.log(arr)