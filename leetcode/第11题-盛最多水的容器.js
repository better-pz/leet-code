var maxArea = function(height) {
  let max = 0;
  for (let i = 0, j = height.length - 1; i < j;) {//双指针i，j循环height数组
      //i，j较小的那个先向内移动 如果高的指针先移动，那肯定不如当前的面积大
      const minHeight = height[i] < height[j] ? height[i++] : height[j--];
      const area = (j - i + 1) * minHeight;//计算面积
      max = Math.max(max, area);//更新最大面积
  }
  return max;
};
