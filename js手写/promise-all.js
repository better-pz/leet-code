Promise.all = function(arr) {
  let index = 0,result =[]
  return new Promise ((resolve,reject) => {
    arr.forEach((item,i) => {
      Promise.resolve(item).then(val => {
        index++
        result[i] = val
        if(index === arr.length) {
          resolve(result)
        }
      }).catch(error => reject(error))
    })
  })
} 