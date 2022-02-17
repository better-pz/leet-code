var firstUniqChar = function(s) {
  for(let x of s){
    console.log('过程',s.indexOf(x),s.lastIndexOf(x))
      if(s.indexOf(x) === s.lastIndexOf(x)) return x
  }
  return ' '
};

const arr = ['a','b','c','d','a','b']
console.log(firstUniqChar(arr))