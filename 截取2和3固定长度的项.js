const arr = ['a', 'bbb', 'ccc', 'ddd', 'ggg', 'fff', 'kkk', 'lll',111,333,444,555]

let newListArr1 = [],newListArr2 = []
let num = 3
    for(let i = 0;i<arr.length;i+=5){
        newListArr1.push(arr.slice(i,i+5))
    }
console.log(newListArr1)

// for(let i = 0;i<newListArr1.length;i++){
//   console.log('循环',newListArr1[i])
//   for(let j= 0;j<newListArr1[i].length;j+=3){
//     newListArr2.push(newListArr1[i].slice(j,j+3))
//   }
// }
newListArr1.map ((item) => {
  for(let j= 0;j<item.length;j+=3){
    newListArr2.push(item.slice(j,j+3))
  }
})
console.log(222,newListArr2)
