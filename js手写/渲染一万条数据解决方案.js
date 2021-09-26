{/* <h1>渲染一万条数据</h1>
<a href="https://baidu.com" target="_blank">百度一下</a>
<ul class="content"></ul> */}
// createDocumentFragment该方法创建一个新的空白的文档片段
// window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
  console.log(1);
  // 总数据
  const total = 10000,
  // 每次处理数据
  each = 20,
  // 需要处理次数
  needTimes = Math.ceil(total / each),
  // 父容器
  content = document.querySelector('.content')
  // 当前处理次数
  let currentTime = 0
  // 处理元素插入
  function add() {
    console.log(3);
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < each; i++) {
      const li = document.createElement('li')
      li.innerText = Math.floor(i+currentTime*each)
      fragment.appendChild(li)
    }
    content.appendChild(fragment)
    currentTime++;
    if (currentTime < needTimes) {
      window.requestAnimationFrame(add)
    }
  }
  window.requestAnimationFrame(add)
  console.log(2)

