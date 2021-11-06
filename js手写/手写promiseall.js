function myPromiseAll(lists) {
  return new Promise((reslove,reject) => {
    let resArr = []
    let num = 0 
    lists.forEach((item) => {
      item.then(res => {
        resArr.push(res)
        num++
        if(num === lists.length) {
          reslove(resArr)
        }
      })
    })
  }) 
}