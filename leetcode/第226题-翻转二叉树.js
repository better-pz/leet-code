// 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  var invertTree = function(root) {
    let now = [root]
    while (now.length) {
        const next = []
        now.forEach(item => {
            if (item === null) return
            let n = item.left
            item.left = item.right
            item.right = n
            next.push(item.left)
            next.push(item.right)
        })
        now = next
    }
    return root
};

};