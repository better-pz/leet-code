const imgList = [...document.querySelectorAll('img')]
const length = imgList.length

const imgLazyload = (function() {
  let count = 0
  return function () {
    let deleteIndexList = []
    imgList.forEach((img,index) => {
      let rec = img.getBoundingClientRect()
      if(rec.top < window.innerHeight + 100) {
        

      }
    })
  }


})()
