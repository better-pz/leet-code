/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    let prev = null
    let curr = head
    // let next = head
    while ( curr !== null ) {
      // next = curr.next
      // curr.next = prev
      // prev = curr
      // curr = next
      [curr.next ,prev, curr] = [prev ,curr , curr.next]
    }
    return prev
};