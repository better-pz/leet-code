var getKthFromEnd = function(head, k) {
  let slow = fast=  head
  while (fast) {

      fast = fast.next
      if(k> 0) {
          k--
      }else {
          slow = slow.next
      }

  }
  return slow
};