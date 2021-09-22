var deleteDuplicates = function(head) {
  // 定义链表的一个头部的指针
  let p = head
  while(p && p.next) {
      if(p.val === p.next.val) {
        // 删除链表的一项
          p.next = p.next.next
      }else {
      // 不相同的时候再移动指针
           p = p.next
      }
  }
  return head
 
};