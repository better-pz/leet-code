Array.prototype.insertionSort = function() {
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i;
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[indexMin]) {
        indexMin = j;
      }
    }
    if (indexMin !== i) {
      const temp = this[i];
      this[i] = this[indexMin];
      this[indexMin] = temp;
    }
  }
};
const arr = [2, 3, 4, 1, 7, 5];
arr.insertionSort();
console.log("排序后", arr);
