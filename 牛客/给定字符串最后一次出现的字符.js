// 给定字符串，请帮小虾米找出最后一个只出现一次的字符。
// function lastUniqueChar( str ) {
//   if(!str) return "";
//   //uniques数组按序存放str中只出现一次的字符
//   var uniques=[];
//   var strLen=str.length;
//   for(let i=0;i<strLen;i++){
//       if(str.indexOf(str[i])===str.lastIndexOf(str[i])){
//           uniques.push(str[i]);
//       }
//   }
//   //一定不要漏掉全都是重复出现的字符的情况
//   if(uniques.length===0)
//       return "";
//   else
//       return uniques[uniques.length-1];
// }
function lastUniqueChar( str ) {
  // write code here
  if(str == "") {
      return ""
  }
  for(let i = str.length - 1; i >= 0; i--) {
      let times = 0;
      for(let j = 0; j < str.length; j++) {
          times = str[i] == str[j] ? times + 1 : times;
      }
      if(times == 1) {
          return str[i];
      }
  }
  return "";
}
console.log(`结果`, lastUniqueChar('小小下m欧1111')) 