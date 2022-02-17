/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    carry = 0,
    ans = [];
  while (i >= 0 || j >= 0 || carry !== 0) {
    let c1 = i >= 0 ? num1.charAt(i) - "0" : 0,
      c2 = j >= 0 ? num2.charAt(j) - "0" : 0;
    let sum = c1 + c2 + carry;
    ans.push(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  return ans.reverse().join("");
};
