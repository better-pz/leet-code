const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: {
        val: 7,
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: {
      val: 6,
      left: null,
      right: null,
    },
  },
};
// 递归
const preorder1 = (root) => {
  if (!root) return;
  console.log(root.val);
  preorder1(root.left);
  preorder1(root.right);
};
// 非递归
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
// preorder2(binaryTree);

const inorder1 = (root) => {
  if (!root) return;
  inorder1(root.left);
  console.log(root.val);
  inorder1(root.right);
};

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
inorder2(binaryTree)

const postorder = (root) => {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
};
// postorder(binaryTree);
