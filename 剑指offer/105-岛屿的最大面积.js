/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let result = 0
  for (let i in grid) {
      for(let j in grid[i] ) {
          if(grid[i][j] === 1) {
              console.log(getArea(i,j,0))
             result = Math.max(result, getArea(i,j,0))
          }
      }
  }
  return  result
  function getArea (i,j,area) {
      console.log(grid)
      if( i+1< grid.length && grid[i+1][j] === 1) area = getArea(i+1,j,area)
      if( j+1< grid[i].length && grid[i][j+1] === 1) area= getArea(i,j+1,area)
      if( i-1> 0 && grid[i+1][j] === 1) area = getArea(i-1,j,area)
      if( j-1> 0 && grid[i][j-1] === 1) area = getArea(i,j-1,area)
      return area +1 
  }
};