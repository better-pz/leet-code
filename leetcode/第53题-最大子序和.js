/**
 * @param {number[]} nums
 * @return {number}
    输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6
    解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。\
 */
// var maxSubArray = function (nums) {
//   let ans = nums[0];
//   let sum = 0;
//   for (const num of nums) {
//     if (sum > 0) {
//       sum += num;
//     } else {
//       sum = num;
//     }
//     ans = Math.max(ans, sum);
//   }
//   return ans;
// };
var maxSubArray = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};

