
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

  // 用字典建立一个映射关系用来记录nums1里有的值
  // const map = new Map
  // for (let item of nums1) {
  //   map.set(item,true)
  // }
  // const res = []
  // for(let item2 of nums2) {
  //   if (map.get(item2)) {
  //     res.push(item2)
  //     map.delete(item2)
  //   }
  // }
  // return res
};