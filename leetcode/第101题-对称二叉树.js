// function isSymmetric(root) {
//   if (!root) return true;
//   const isMirror = (l, r) => {
//       const queue = [l, r];
//       while (queue.length) {
//           const u = queue.shift();
//           const v = queue.shift();
//           if (u == null && v == null) continue;
//           if (u == null || v == null) {
//               return false;
//           }
//           if (u.val !== v.val) {
//               return false;
//           }
//           queue.push(u.left, v.right);
//           queue.push(u.right, v.left);
//       }
//       return true;
//   }
//   return isMirror(root.left, root.right)
// };

var isSymmetric = function(root) {
    //迭代方法判断是否是对称二叉树
    //首先判断root是否为空
    if(root===null){
        return true;
    }
    let queue=[];
    queue.push(root.left);
    queue.push(root.right);
    while(queue.length){
        let leftNode=queue.shift();//左节点
        let rightNode=queue.shift();//右节点
        if(leftNode===null&&rightNode===null){
            continue;
        }
        if(leftNode===null||rightNode===null||leftNode.val!==rightNode.val){
            return false;
        }
        queue.push(leftNode.left);//左节点左孩子入队
        queue.push(rightNode.right);//右节点右孩子入队
        queue.push(leftNode.right);//左节点右孩子入队
        queue.push(rightNode.left);//右节点左孩子入队
    }
    return true;
  };
  