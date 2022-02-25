// 摩尔投票法

var majorityElement = function(nums) {
  // 因为题目中数组中数字出现的次数大于数组长度的一半。
  // 如果我们把众数（出现次数超过一半的数字）记为 +1，把其他数记为 −1，将它们全部加起来，显然和大于 0。
  var vote = 0, selectNum = 0;
  for(const item of nums){
      if(vote === 0){
          selectNum = item;
      }
      vote += item === selectNum ? 1 : -1;
  }
  return selectNum;
};

var majorityElementSort = function(nums) {
  // 因为题目中数组中数字出现的次数大于数组长度的一半。
  // 如果我们把众数（出现次数超过一半的数字）记为 +1，把其他数记为 −1，将它们全部加起来，显然和大于 0。
nums.sort((a,b)=>a-b)
  return nums[Math.floor(nums.length/2)];
};

const arr = [1,2,3,2,2,2,5,4,2]
console.log(majorityElement(arr))

