Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length -1 -i; j++) {
      if (this[j] > this[j+1]) {
        const temp = this[j]
        this[j] = this[j+1]
        this[j+1] = temp
      }
    }
  }
}
const arr = [2,3,4,1,7,5]
arr.bubbleSort()
console.log('排序后', arr)