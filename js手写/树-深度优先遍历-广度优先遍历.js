const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [
            
          ]
        },
        {
          val: 'e',
          children: [
            
          ]
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [
            
          ]
        },
        {
          val: 'g',
          children: [
            
          ]
        }
      ]
    }
  ]
}
// 深度优先遍历
const dfs =(root) => {
  console.log(root.val)
  root.children.forEach(dfs)
}

// dfs(tree)

// 广度优先遍历
const bfc = (root) => {
  const q = [root]
  while (q.length > 0) {
    const n = q.shift()
    console.log(n.val)
    n.children.forEach(child => {
      q.push(child)
    })
  }
}
bfc(tree)