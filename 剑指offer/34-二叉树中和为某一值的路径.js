
/**
* Definition for a binary tree node.
  给你二叉树的根节点 root 和一个整数目标和 targetSum ，
  找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
* @param {TreeNode} root
* @param {number} target
* @return {number[][]}
*/
var pathSum = function(root, target) {
  if(root === null) return []
  const res = []
  // 深度优先遍历
  const dfs = (root,target,path) => {
      // 到子叶节点并且当前节点的值跟剩余sum相等,则推入结果栈中
      if(root.val === target && !root.left && !root.right) {
          res.push(path)
      }
      // 路径中加入当前节点的值
      path.push(root.val)
      // 递归的取左右子树中查找路径
      if(root.left) {
          dfs(root.left,target-root.val,path.slice())
      }
      if(root.right) {
          dfs(root.right,target-root.val,path.slice())
      }
  }
  dfs(root,target,[])
  return res
};