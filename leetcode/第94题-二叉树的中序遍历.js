// 中序遍历(递归)
const inorder1 = (root) => {
  if (!root) return;
  inorder1(root.left);
  console.log(root.val);
  inorder1(root.right);
};
// 中序遍历(非递归)
const inorder2 = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};