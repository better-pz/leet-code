/**
 * @param {number[]} nums
 * @return {number}
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，
 * 其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 */
var singleNumber = function(nums) {
  var singleNumber = function(nums) {
    const map = new Map()
     for(let val of nums) {
       map.set(val,(map.get(val) ||0) +1)
     }
     let res = ''
     for(let [val,index] of map.entries()) {
       if(index === 1) {
           res = val
           return val
       }
     }
   };
};