const levelOrder = (root) => {
  if(!root) return []
  const queue = [root]
  const res = []
  while (queue.length) {
    const n = queue.shift()
    res.push(n.val)
    n.left && queue.push(n,left)
    n.right && queue.push(n.right)
  }
  return res
}


