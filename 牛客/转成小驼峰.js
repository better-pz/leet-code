// 题目:
// 将输入的变量名转换为小驼峰写法

// 可能的输入命名如下：

// TestVariable

// test_variable

// TEST_VARIABLE，

// 最终输出为testVariable


// 解---1
function format( name ) {
  if(!name) return "";
  //用下划线来分割字符串，存放在一个数组中
  const arr=name.split("_");
  const arrLen=arr.length;
  let result="";
  //arr的长度为1表示没有下划线的输入情况
  if(arrLen===1){
      //只需把首字母改为小写
      result=name[0].toLowerCase();
      result+=name.substr(1);
  }else{
      //有下划线且全为小写字母的输入情况
      if(name[0]>="a"&&name[0]<="z"){
          for(let i=1;i<arrLen;i++){
              //只需把每个单词的首字母改为大写
              arr[i]=arr[i][0].toUpperCase()+arr[i].substr(1);
          }
          result=arr.join("");
      }else if(name[0]>="A"&&name[0]<="Z"){
          //有下划线且全为大写字母的输入情况
          arr[0]=arr[0].toLowerCase();
          for(let i=1;i<arrLen;i++){
              arr[i]=arr[i].toLowerCase();
              arr[i]=arr[i][0].toUpperCase()+arr[i].substr(1);
          }
          result=arr.join("");
      }
  }
  return result;
}