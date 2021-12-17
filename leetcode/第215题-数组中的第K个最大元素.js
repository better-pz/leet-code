/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
  给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
  输入: [3,2,1,5,6,4] 和 k = 2
  输出: 5
  1. 构建一个最小堆, 并依次把数组的值插入堆中
  2. 当堆的容量超过k, 就删除堆顶
  
 */
var findKthLargest = function(nums, k) {
  
};