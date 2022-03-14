const imgList = [...document.querySelectorAll('img')]
const length = imgList.length

const imgLazyload = (function() {
  let count = 0
  return function () {
    let deleteIndexList = []
    imgList.forEach((img,index) => {
      let rec = img.getBoundingClientRect()
      if(rec.top < window.innerHeight + 100) {
        data.src = img.dataset.src
        deleteIndexList.push(index)
        count++
        if(count === length) document.removeEventListener('scroll',imgLazyload)

      }
    })
    imgList = imgList.filter((img,index) => !deleteIndexList.includes(index))
  }


})()
