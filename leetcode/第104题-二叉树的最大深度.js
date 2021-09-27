/**
 * @param {TreeNode} root
 * @return {number}
  给定一个二叉树，找出其最大深度。
  二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
  说明: 叶子节点是指没有子节点的节点。
 */
var maxDepth = function(root) {
  // 深度优先遍历
  let res = 0
  const dfs =(n,l) =>{
    if (!n) return
    if (!n.left && !n.right) {
      res = Math.max(res,l)
    }
    dfs(n.left,l+1)
    dfs(n.right,l+1)
  }
  dfs(root,1)
  return res
};