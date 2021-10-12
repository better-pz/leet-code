// 输入一个数 M ，表示数组中有 M 个数
// 输入 M 个数。
// 输入 n
// 求数组 M 中，去除重复值后，最大 n 个数和最小 n 个数的和
// 注意：最大和最小的数中不能有重复值，否则输出 -1
let arrLen = 5;
let inputArr = [3, 2, 3, 4, 2];
let N = 1;
function sum(M, MArr, n) {
  const _MArr = Array.from(new Set(MArr)).sort((a, b) => a - b);
  console.log(_MArr);
  if (2 * n > _MArr.length) {
    console.log(-1);
    return -1;
  } else {
    const minArr = _MArr.slice(0, n);
    const maxArr = _MArr.slice(_MArr.length - N, _MArr.length);
    console.log("截取最小的n个数", minArr, maxArr);
    const sumArr = minArr.concat(maxArr);
    console.log("需要相加的树", sumArr);
    const res = sumArr.reduce((sum, pre) => sum + pre);
    console.log("最终和",res);
    return res
  }
}

sum(arrLen, inputArr, N);
