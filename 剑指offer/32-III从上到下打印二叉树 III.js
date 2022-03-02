/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

var levelOrder = function (root) {
  // 如果是空树
  if (!root) return [];
  let queue = [root],
    res = [];
  let depth = 0;
  while (queue.length) {
    let level = [];
    let size = queue.length;
    while (size--) {
      let cur = queue.shift();
      level[depth & 1 ? "unshift" : "push"](cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(level);
    depth++;
  }
  return res;
};

