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
    let now = [root]
    // 广度优先遍历,利用层次遍历
    // 设置当前存储节点的数组,初始化是根节点
    
    while (now.length) {
        const next = []
        now.forEach(item => {
            // 节点为null直接返回
            if (item === null) return
            // 定义第三变量交换左右子节点
            let n = item.left
            item.left = item.right
            item.right = n
            // 将左右子节点放进数组
            next.push(item.left)
            next.push(item.right)
        })
        now = next
    }
    return root
};

