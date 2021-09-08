const arr = ['a', 'bbb', 'ccc', 'ddd', 'ggg', 'fff', 'kkk', 'lll',111,333,444,555,222,2]

let newListArr1 = [],newListArr2 = []
// 多存循环
// let num = 3
//     for(let i = 0;i<arr.length;i+=5){
//         newListArr1.push(arr.slice(i,i+5))
//     }
// console.log(newListArr1)
// newListArr1.map ((item) => {
//   for(let j= 0;j<item.length;j+=3){
//     newListArr2.push(item.slice(j,j+3))
//   }
// })



// 一次while循环
let i = 0
    while (arr.length>0) {
      if(i%2 === 0 ) {
        newListArr1.push(arr.splice(0,2))
      }else {
        newListArr1.push(arr.splice(0,3))
      }
      i++
    }
console.log(222,newListArr1)
