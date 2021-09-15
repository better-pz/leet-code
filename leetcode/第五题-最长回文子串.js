// 题目:
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。



// var longestPalindrome = function (s) {
//   if (s.length < 2) {
//     return s;
//   }

//   let start = 0;
//   let maxLength = 1;

//   function expandAroundCenter(left, right) {
//     while (left >= 0 && right < s.length && s[left] === s[right]) {
//       if (right - left + 1 > maxLength) {
//         maxLength = right - left + 1;
//         start = left;
//       }
//       left--;
//       right++;
//     }
//   }
//  // 遍历每个可能的中心点位，以左右指针模拟中心点
//   for (let i = 0; i < s.length; i++) {
//     expandAroundCenter(i - 1, i + 1);
//     expandAroundCenter(i, i + 1);
//   }

//   return s.substring(start, start + maxLength);
// };



var longestPalindrome = function(s) {
  // s为空字符串或为长为1的字符串，返回字符串本身
  if (s.length < 2) return s;

  let res = '';
  // 遍历每个可能的中心点位，以左右指针模拟中心点
  for (let i = 0; i < s.length; i++) {
    // 双数情况
    getCenter(i, i);
    // 单数情况
    getCenter(i, i + 1);
  }

  // 本函数的作用为：获取最长的，以本中心点为中心的回文串
  function getCenter(left, right) {
    // 边界条件：左指针不小于0，右指针不超过数组的最长长度。
    // 进入循环条件：满足边界条件，且当前两个指针指向的字符相等
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      // 左侧指针左移，右侧指针右移，开启下次字符相等的判断循环。当超出系统边界或两指针指向的字符不相等，则退出
      left--;
      right++;
    }

    // 循环结束，两指针目前指向的字符串中间其实是不满足回文串
    // 事实上本次while获得的回文串的左侧为left + 1，右侧为right - 1
    // 所以本次获得的回文串长度为 (right - 1) - (left + 1) + 1 = right - left - 1，与res长度判断后取最长的回文子串
    if (right - left - 1 > res.length) {
      // 记住这里需要截取的是正确的回文子串，所以要消除while循环中，最后一次不满足条件的left、right的影响
      /**
       * left => left + 1
       * right - 1 => right - 1 + 1 = right
       **/
      res = s.slice(left + 1, right);
    }
  }
  return res
};

