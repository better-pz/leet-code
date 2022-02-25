/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

  const findIndex = (nums,target) => {
      let left = 0
      let right = nums.length - 1
      while (left <=right) {
          let mid = Math.floor(left+(right-left)/2)
          if(nums[mid] === target) {
            // 相等时从右往左缩小区间
              right = mid-1
          }else if(nums[mid]<target) {
              left = mid+1
          }else if(nums[mid]> target) {
              right = mid-1
          }
      }
      return left
  }
  if(findIndex(nums,target) > nums.length || nums[findIndex(nums,target)] !== target) {
      return 0 
  } else {
      return findIndex(nums,target+1) - findIndex(nums,target)
  }
};