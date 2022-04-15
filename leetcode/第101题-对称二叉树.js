function isSymmetric(root) {
  if (!root) return true;
  const isMirror = (l, r) => {
      const queue = [l, r];
      while (queue.length) {
          const u = queue.shift();
          const v = queue.shift();
          if (u == null && v == null) continue;
          if (u == null || v == null) {
              return false;
          }
          if (u.val !== v.val) {
              return false;
          }
          queue.push(u.left, v.right);
          queue.push(u.right, v.left);
      }
      return true;
  }
  return isMirror(root.left, root.right)
};

