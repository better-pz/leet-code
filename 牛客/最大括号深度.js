


/**
 * 
 * 描述
 * 一字符串仅由三种（6个）括号组成，求嵌套深度，若不合法，输出0
 * @param {string} s
 * @return {boolean}
 * 【分析】
  栈的应用，左括号入栈，遇到右括号出栈判断两个括号是否匹配，
  若匹配，继续，不匹配，则不合法，直至遍历完
 */

  function maxDeep (s) {
    if(s.length % 2 === 1) return 0
    const track = []
    let deep = 0
    let res = 0
    const map = new Map()
    map.set('[',']')
    map.set('(',')')
    map.set('{','}')
    for(const x of s) {
      if(map.has(x)) {
        deep ++
      }else {
        deep --
      }
      res = Math.max(deep ,res)
    }
    return res
  }
  const s = '((()))(()(){{}}{{{}}})'
  console.log('最大深度', maxDeep(s))