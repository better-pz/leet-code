/**
 * @param {number[]} nums
 * @return {number}
  如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
  给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
  输入：[1,2,3,1]
  输出：4
  解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
       偷窃到的最高金额 = 1 + 3 = 4 。

 */
var rob = function(nums) {
  if(nums.length === 1) {
    return nums[0]
  }
  let prev2 = nums[0]
  let prev1 = Math.max(nums[0],nums[1])
  for(let i = 2; i<nums.length; i++ ) {
    let temp = Math.max(nums[i] + prev2 ,prev1)
    prev2 = prev1
    prev1 = temp
  }
  return prev1
};