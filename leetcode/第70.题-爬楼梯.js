// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 注意：给定 n 是一个正整数。
// f(x)=f(x−1)+f(x−2)

// 使用动态规划 dp

function climbStairs(n) {
  // 因为状态转移只和上一次迭代和上上次迭代的结果有关，所以只用两个变量存储，不需要用数组，减少了空间
  if (n === 0) return 0;
  let pre = 0;
  let cur = 0;
  let sum = 1;
  for (let i = 1; i <= n; i++) {
    pre = cur;
    cur = sum;
    sum = pre + cur;
  }
  return sum;
}
console.log(climbStairs(4));
