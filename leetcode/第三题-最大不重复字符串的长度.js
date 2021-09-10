var lengthOfLongestSubstring = function(s) {
  // 定义两个指针和要输出的最大长度的变量
   let i = 0 ,j = 0, maxLength = 0
   const set = new Set()
   //判断数组的长度为0的时候直接返回0
   if (s.length === 0) return 0 
   
   for(i; i < s.length; i++) {
 
     if (!set.has(s[i])) {
       set.add(s[i])
       maxLength = Math.max(maxLength,set.size)
     }else {
       while (set.has(s[i])) {
         set.delete(s[j])  
         j++
       }
       set.add(s[i])
     }
   }
   return maxLength
 };

  console.log(lengthOfLongestSubstring('adccab')); 