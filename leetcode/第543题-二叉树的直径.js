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
var diameterOfBinaryTree = function(root) {
  // 默认为1是因为默认了根节点自身的路径长度
  let ans = 1;

  function depth(rootNode) {
      if (!rootNode) {
          // 如果不存在根节点，则深度为0
          return 0;
      }
      // 递归，获取左子树的深度
      let L = depth(rootNode.left);
      // 递归，获取右子树的深度
      let R = depth(rootNode.right);

      /* 关键点1
      L+R+1的公式是如何而来？
      等同于：左子树深度(节点个数) + 右子树深度（节点个数） + 1个根节点
      便是这株二叉树从最左侧叶子节点到最右侧叶子节点的最长路径
      类似于平衡二叉树的最小值节点到最大值节点的最长路径
      之所以+1是因为需要经过根节点
       */
      // 获取该树的最长路径和现有最长路径中最大的那个
      ans = Math.max(ans, L + R + 1);
      /* 关键点2
      已知根节点的左右子树的深度，
      则，左右子树深度的最大值 + 1，
      便是以根节点为数的最大深度*/
      return Math.max(L, R) + 1;
  }

  depth(root);

  // 由于depth函数中已经默认加上数节点的自身根节点路径了，故此处需减1
  return ans - 1;
}; 
