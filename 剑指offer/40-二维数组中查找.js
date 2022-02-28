/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
  在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序
  每一列都按照从上到下递增的顺序排序。
  请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数

 */
var findNumberIn2DArray = function(matrix, target) {
  const findTaget = (arr,target) => {
    let left = 0
    let right = arr.length -1
    while (left <= right) {
      let mid = left+((right-left)>>1)
      if(arr[mid] === target) {
        return 1
      }else if(arr[mid] < target) {
        left = mid + 1
      }else if(arr[mid] > target) {
        right = mid -1  
      }
    }
    return 0
  }
  let result = 0
  for(let item of matrix) {
    result += findTaget(item,target)
  }
  return !!result
};
const arr = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
],
target  = 5
console.log(findNumberIn2DArray(arr)) 
