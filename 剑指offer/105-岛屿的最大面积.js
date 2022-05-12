/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let result = 0
    // for (let i in grid) {
    //     for(let j in grid[i] ) {
    //         if(grid[i][j] === 1) {
            
    //             const area = getMaxArea(i, j, 0);
    //            result = Math.max(result, area);
    //         }
    //     }
    // }
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                if(grid[i][j] == 1) {
                    const area = getMaxArea(i, j, 0);
                    result = Math.max(result, area);
                }
            }
        }
        
    function getMaxArea (i,j,area) {
        // console.log(grid)
        grid[i][j] = 0
        if( i+1< grid.length && grid[i+1][j] === 1) area = getMaxArea(i+1,j,area)
        if( j+1< grid[i].length && grid[i][j+1] === 1) area= getMaxArea(i,j+1,area)
        if( i-1>= 0 && grid[i-1][j] === 1) area = getMaxArea(i-1,j,area)
        if( j-1>= 0 && grid[i][j-1] === 1) area = getMaxArea(i,j-1,area)
        return area +1 
    }
    
    return  result
};