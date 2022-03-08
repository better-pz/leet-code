/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if(prices.length === 0) return 0
  let min = prices[0]
  let max = 0
  for(let val of prices) {
    min = Math.min(val,min)
    max = Math.max(val-min,max)
  }
  return max
};

var maxSubArray = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};
