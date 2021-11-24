// 先序(遍历)
const preorder1 = (root) => {
  if (!root) return;
  console.log(root.val);
  preorder1(root.left);
  preorder1(root.right);
};
// 先序遍历(非递归)
const preorder2 = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
};

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
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  // 递归
  // let stack = []
  // const inorder = (root) => {
  //     if(!root) {
  //      return   
  //     }
  //     stack.push(root.val)
  //     inorder(root.left)
  //     inorder(root.right) 
  // }
  // inorder(root)
  // return stack

  // 非递归

  // 初始化数据
  const res =[];
  const stack = [];
  while (root || stack.length){
    while(root){
      res.push(root.val);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return res;
};