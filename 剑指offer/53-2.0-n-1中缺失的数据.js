/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let left = 0,
  right = nums.length -1
  while (left <= right) {
      let mid = left + ((right-left) >> 1)
      if(mid === nums[mid]) {
          left = mid + 1
      }else if(mid < nums[mid] ) {
          right = mid -1
      }
 
  }     
  return left
};