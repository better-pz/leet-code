/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  //   const length = nums.length
  //   if (length <= 1) {
  //     return nums
  //   }
  //   const midIndex = Math.floor(length / 2)
  //   const midValue = nums.splice(midIndex, 1)[ 0 ]
  //   let leftArray = []
  //   let rightArray = []
  //   let index = 0
  //   while (index < length - 1) {
  //     const curValue = nums[ index ]
  //     if (curValue <= midValue) {
  //       leftArray.push(curValue)
  //     } else {
  //       rightArray.push(curValue)
  //     }
  //     index++
  //   }
  //   return sortArray(leftArray).concat([ midValue ], sortArray(rightArray))
  
      let left = 0,
          right = nums.length - 1;
      //console.time('QuickSort');
      main(nums, left, right);
      //console.timeEnd('QuickSort');
      return nums;
      function main(nums, left, right) {
          // 递归结束的条件，直到数组只包含一个元素。
          if(nums.length === 1) {
              // 由于是直接修改arr，所以不用返回值。
              return;
          }
          // 获取left指针，准备下一轮分解。
          let index = partition(nums, left, right);
          if(left < index - 1) {
              // 继续分解左边数组。
              main(nums, left, index - 1);
          }
          if(index < right) {
              // 分解右边数组。
              main(nums, index, right);
          }
      }
      // 数组分解函数。
      function partition(nums, left, right) {
          // 选取中间项为参考点。
          let pivot = nums[Math.floor((left + right) / 2)];
          // 循环直到left > right。
          while(left <= right) {
              // 持续右移左指针直到其值不小于pivot。
              while(nums[left] < pivot) {
                  left++;
              }
              // 持续左移右指针直到其值不大于pivot。
              while(nums[right] > pivot) {
                  right--;
              }
              // 此时左指针的值不小于pivot，右指针的值不大于pivot。
              // 如果left仍然不大于right。
              if(left <= right) {
                  // 交换两者的值，使得不大于pivot的值在其左侧，不小于pivot的值在其右侧。
                  [nums[left], nums[right]] = [nums[right], nums[left]];
                  // 左指针右移，右指针左移准备开始下一轮，防止arr[left]和arr[right]都等于pivot然后导致死循环。
                  left++;
                  right--;
              }
          }
          // 返回左指针作为下一轮分解的依据。
          return left;
      }
  
  };