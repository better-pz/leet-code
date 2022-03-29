/**
 * @param {number[]} nums
 * @return {number}
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 */
var singleNumber = function(nums) {
  // 异或运行规则:
  // 1. 任何数跟0做异或运算结果都等于这个数
  // 2. 两个相同的数做异或运算结果等于0
  let ans = 0
  for(let val of nums){
      ans ^= val
  }
  return ans
};