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

Promise.allSettled = function (arr) {
  let result = []
  return new Promise ((resolve,reject) => {
    arr.forEach((item,index) => {
      Promise.resolve(item).then((res) => {
        result.push({
          status:'fulfilled',
          value:res
        })
        result.length === arr.length && resolve(result)
      }).catch((error) => {
        result.push({
          status:'rejected',
          value:error
        })
        result.length === arr.length && resolve(result)
      })
    })
  })
}