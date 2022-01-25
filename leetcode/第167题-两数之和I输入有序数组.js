/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 *输入：numbers = [2,7,11,15], target = 9
  输出：[1,2]
  解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
  提示：二分查找算法
    1. 定义头尾两个指针 left = 0 ,right = length 中间索引 mid = left + (right - left) / 2
    2. 当left <= right 如果mid上的值等于target, 返回mid, 如果小于targt, left = mid + 1(砍掉左半边)
    如果大于target , right = mid - 1(砍掉右半边)
    3. 如果while 循环结束后都没有找到target , 返回-1
 */
    var twoSum = function(numbers, target) {
      let left = 0
      let right = numbers.length-1
      // let midIndex = 0
      while (left<=right) {
        // midIndex = Math.floor(left + (right - left)/2)
        let sum = numbers[left] + numbers[right]
        if (sum === target) {
          return [left+1,right+1]
        }
        if(sum<target) {
          left ++ 
        }else {
          right --
        }
      }
    };