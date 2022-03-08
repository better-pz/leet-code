// 记忆化+递归
/**
 * @param {number[]} nums
 * @return {number}
 */
var fib = function(n) {
  if(n <=1) return n
  let pre2 = 0
  let pre1 = 1
  let result = 0
  for(let i = 2;i<=n; i++) {
      result = pre1+ pre2
      pre2 = pre1
      pre1 = result
  }
  return result

};
var fib = function(n) {
  const MOD = 1000000007;
  if (n < 2) {
      return n;
  }
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; ++i) {
      p = q; 
      q = r; 
      r = (p + q) % MOD;
  }
  return r;
};

