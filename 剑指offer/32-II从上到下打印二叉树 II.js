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
var levelOrder = function(root) {
  if (!root) {
      return []
  }
  //  结果数组
  const res = [];
  //  队列
  const queue = [[root]];
  while (queue.length) {
      //  取出队列第一个
      const currentNode = queue.shift();
      //  当前对列结果
      const currentRes = [];
      //  当前队列节点的子左右节点
      const currentNodeChild = [];
      //  循环当前队列
      currentNode.forEach(node => {
          //  收集当前队列节点的内容
          currentRes.push(node.val);
          if (node.left) {
              currentNodeChild.push(node.left)
          }
          if (node.right) {
              currentNodeChild.push(node.right)
          }
      });
      //  如存在子节点
      if (currentNodeChild.length) {
          queue.push(currentNodeChild)
      }
      //  收集当前队列结果
      if (currentRes.length) {
          res.push(currentRes);
      }
  }

  return res;
};

// method 2
var levelOrder = function(root) {
  var queue = [root];
  var result = [];
  if(!root)
  return [];
  
  while(queue.length){
      var temp = [];//注意①
      let num =  queue.length
     for(let i = 0; i <num; i++){//注意②
         let n = queue.shift();
         temp.push(n.val);
         n.left && queue.push(n.left);
         n.right && queue.push(n.right);
     }
     result.push(temp);
     
  }
  return result;
  
  };
  
  