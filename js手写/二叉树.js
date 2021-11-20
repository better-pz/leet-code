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
// 迭代
var Traversal = function(root) {
  const stack = [];
  while (root || stack.length){
    while(root){
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return res;
};

// preorder2(binaryTree);
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
// leetcode 迭代
const inorderTraversal = (root) => {
  if(!root) return [];
const res = [];
const stack = [];
while(root || stack.length){
    while(root){
        stack.push(root)
        root = root.left;
    }
   root = stack.pop();
   res.push(root.val);
   root = root.right;
}
return res;
};



// inorder2(binaryTree)
// 后序遍历 (递归)
const postorder1 = (root) => {
  if (!root) return;
  postorder1(root.left);
  postorder1(root.right);
  console.log(root.val);
};
postorder1(binaryTree);
// 后序遍历 (非递归)
const postorder2 = (root) => {
  if (!root) return;
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};


//  leetcode 迭代
var postorderTraversal = function(root) {
  // 初始化数据
    const res =[];
    const stack = [];
    while (root || stack.length){
      while(root){
        stack.push(root);
        res.unshift(root.val);
        root = root.right;
      }
      root = stack.pop();
      root = root.left;
    }
    return res;
};

postorder2(binaryTree);
