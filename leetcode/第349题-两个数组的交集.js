
/**
   *   输入：nums1 = [1,2,2,1], nums2 = [2,2]
   *   输出：[2]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {

  // new Set(nums1) 去重
  return  [...new Set(nums1)].filter(item => nums2.includes(item))
};