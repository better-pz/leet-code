/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  //创建一-个map
const map = new Map()
//for循环遍历nums数组
for (let i= 0; i<nums.length; i++) {
  //用target减nums[i],以计算哪个数能跟当前的数字相加得到target
  const complement = target - nums[i]
 // 检查map里有没有用target减nums[i]得到的数,如果有则返回结果,如果没有则把num[i]当作key,i当作value放入map中,用到了map.has检查map中对应的key
  if (map.has(complement)) {
    //如果查找到map中存在就返回两个数对应的下标
    return [map.get(complement),i]
  }else {
    map.set(nums[i],i)
  }
}

return []

};