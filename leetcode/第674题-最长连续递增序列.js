// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
  let dp = new Array(nums.length).fill(1)
  for (let i = 1;i<nums.length;i++) {
    console.log(nums[i])
    if(nums[i ] > nums[i - 1]) {
      // 确定递推公式
      // 当nums[i ] > nums[i - 1],那么以i为结尾的数组的连续递增子序列肯定等于以i-1为结尾的数组的连续递增子序列的长度+1
      dp[i] = dp[i-1] + 1
    }
  }
  return Math.max(...dp)

};