
// 704. 二分查找
/**
 * 
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


示例 1:

输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

示例 2:

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
 

提示：二分查找算法
1. 定义头尾两个指针 left = 0 ,right = length 中间索引 mid = left + (right - left) / 2
2. 当left <= right 如果mid上的值等于target, 返回mid, 如果小于targt, left = mid + 1(砍掉左半边)
如果大于target , right = mid - 1(砍掉右半边)
3. 如果while 循环结束后都没有找到target , 返回-1

 */


const search = (nums, target) => {
  let i = 0
  let j = nums.length - 1
  let midIndex = 0

  while (i <= j) {
    midIndex = Math.floor((i + j) / 2)
    const midValue = nums[ midIndex ]

    if (midValue === target) {
      return midIndex
    } else if (midValue < target) {
      i = midIndex + 1
    } else {
      j = midIndex - 1
    }
  }

  return -1
}

console.log(search([-1,0,3,5,9,12], 9)) // 4

