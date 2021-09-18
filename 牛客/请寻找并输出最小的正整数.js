// 题目:
// 现给定任意正整数 n，请寻找并输出最小的正整数 m（m>9），使得 m 的各位（个位、十位、百位 ... ...）之乘积等于n，若不存在则输出 -1。
function solution( n ) {
  // write code here
  if(n<10) return 10+n
  let res = 0 ,base = 1
  for (let i= 9; i>1;i--) {
    while (n % i == 0) {
      res += i * base;
      base*=10;
      n /= i;
  }
  if (n > 1) return -1;
  else return res;
  }
  
}

console.log('结果',solution(23))