// const quickSort = (array) => {
//   const length = array.length

//   if (length <= 1) {
//     return array
//   }

//   const midIndex = Math.floor(length / 2)
//   const midValue = array.splice(midIndex, 1)[ 0 ]
//   let leftArray = []
//   let rightArray = []
//   let index = 0

//   while (index < length - 1) {
//     const curValue = array[ index ]

//     if (curValue <= midValue) {
//       leftArray.push(curValue)
//     } else {
//       rightArray.push(curValue)
//     }

//     index++
//   }

//   return quickSort(leftArray).concat([ midValue ], quickSort(rightArray))
// }

// const arr = [ -10, 10, 1, 34, 5, 1 ]

// console.log(quickSort(arr)) // [-10, 1, 1, 5, 10, 34]
const partition = (arr, left, right) => {
  let x = arr[left];
  let i = left;
  let j = right;

  while (i < j) {
    // 先从后往前找小的, 没找到继续找
    while (i < j && arr[j] > x) {
      j--;
    }
    // 找到了，将值填入坑里, a[j]又变成了坑
    if (i < j) {
      a[i] = a[j];
    }

    // 然后从前往后找大的，没找到继续找
    while (i < j && arr[i] < x) {
      i++;
    }
    // 找到了，将值填入之前的坑里
    if (i < j) {
      a[j] = a[i];
    }
  }

  // 将基准值填入坑
  a[i] = x;

  return i;
};

const quickSort = (arr, left, right) => {
  const length = arr.length;
  const start = left || 0;
  const end = right !== undefined ? right : length - 1;

  if (start < end) {
    const index = partition(arr, start, end);
    quickSort(arr, start, index - 1); // 调整基准值左边
    quickSort(arr, index + 1, end); // 调整基准值右边
  }

  return arr;
};

const a = [2, 1, 3, 6, 4, 5, 9, 8, 7];

// 测试下
let result = quickSort(a);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
