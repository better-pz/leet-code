// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length % 2 === 1) return false;
    const track = []
    const map = new Map()
    map.set('(',')')
    map.set('{','}')
    map.set('[',']')
    // for (const x of s) {
    //   if (map.has(x)) {
    //     track.push(x);
    //   }else if (map.get(track.pop())!== x){
    //       return false;
    //   }
    // }
    for (let x of s) {
      if (map.has(x)) {
        track.push(x);
      } else {
        const t = track[track.length - 1];
        if (map.get(t) === x) {
          track.pop();
        } else {
          return false;
        }
      }
    }
    return !track.length;
  };


/*  先取出s[i],1.是左括号，入栈;
               2.是右括号,2.1若此时栈空,则出错;2.2否则出栈顶元素,并和s[i]匹配,2.2.1若成功,栈顶出栈,2.2.2.否则报错,
               3.最后判断栈是否为空 */
// const isValid = function(s) {
//   if (s.length % 2 === 1) return false;

//   const track = [];
//   // 通过数组模拟栈数据结构 先进后出
//   for (let i = 0; i < s.length; i++) {
//     const item = s[i];
//     // 如果是左括号就进栈
//     if (item === "{" || item === "[" || item === "(") {
//       track.push(item);
//     } else {
//       // 若为右括号 ,若栈空时,返回一个false
//       if (track.length === 0) return false;
//       let s = track[track.length - 1];
//       if (
//         (item === "}" && s === "{") ||
//         (item === "]" && s === "[") ||
//         (item === ")" && s === "(")
//       ) {
//         track.pop();
//       } else {
//         return false;
//       }
//     }
//   }
//   return track.length === 0;
// };

console.log("isValid", isValid("(){{{}}}[[{}]]]]]]]"));
