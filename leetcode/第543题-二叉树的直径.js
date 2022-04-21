/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)

 *     给定一棵二叉树，你需要计算它的直径长度。
  *    一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归

var diameterOfBinaryTree = function(root) {
  let max = 0
  const travel = (node) => {
    if(!node) return 0
    const leftDepth = travel(node.left)
    const rightDepth = travel(node.right)
    max = Math.max(leftDepth+rightDepth,max)
    
  }
  travel(root)
  return max
};