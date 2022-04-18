// 中序遍历"左根右
// 中序遍历(递归)
const inorder1 = (root) => {
  if (!root) return;
  inorder1(root.left);
  console.log(root.val);
  inorder1(root.right);
};
var inorderTraversal = function (root) {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};

// 中序遍历(非递归,迭代)
const inorder2 = (root) => {
  if (!root) return;
  const res = []
  const track = []
  // let p = root
  while (track.length ||root) {
      // 把左子树全入栈
      while (root) {
          track.push(root)
          root = root.left
      }
      root = track.pop()
      res.push(root.val)
      // 遍历根节点左边的节点的右侧
      root = root.right
      console.log('root',root)
  }
  return res
};
