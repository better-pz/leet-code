/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) { 
  const set = new Set(nums)
  const res = []
  console.log(set)
for(let i = 1;i<= nums.length ;i++) {
    if(!set.has(i)){
        res.push(i)
    }
}
return res
};