/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}\
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
  如果数组中不存在目标值 target，返回 [-1, -1]。
 */
  var searchRange = function (nums, target) {
    // 定义一个函数用二分查找找到目标值
    const findIndex = (nums,target) =>{
      let left = 0;
      let right = nums.length - 1;
      let mid = 0
      while (left <= right) {
        mid = Math.floor(left +(right - left) / 2);
          //   console.log(left,right,mid)
        if(nums[mid] === target) {    
          right = mid -1
        }else if(nums[mid] > target) {
          right = mid-1
        }else if(nums[mid] < target){
          left = mid + 1
        }
      }
      return left
    }
   //  两次调用这个函数，第一次获得target的左边界，第二次获得target + 1的左边界，将第二次的结果减一就是target的右边界。
    if(findIndex(nums,target)>nums.length || nums[findIndex(nums,target)] !== target) {
      return  [-1,-1]
    }else {
      return  [findIndex(nums,target),findIndex(nums,target+1)-1]
    }
  
  };
  
 const res =  searchRange([5,7,7,8,8,10],8)
  console.log('结果',res)