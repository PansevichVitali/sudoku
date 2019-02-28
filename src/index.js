module.exports = function solveSudoku(matrix) {
  const matrixSudoku = matrix;
  let boolMatchChecking = true;

  for (let row = 0; row < 8; row++) {
    for(let col = 0; col < 8; col++) {
      if(matrix[row][col] === 0) {
        matrixSudoku[row][col]++;      
        for(let k = 1; k < 9; k++) {
          if(boolMatchChecking === findInRows(row,col, matrixSudoku[row][col]) 
          && boolMatchChecking === findInColumns(row,col, matrixSudoku[row][col])
          && boolMatchChecking === findInSquare(row,col, matrixSudoku[row][col]))
            break;
          else  {
            matrixSudoku[row][col]++;
            continue;
          }
        }
      }
    }
  }

 function findInRows(row,col, valueInMatrix) {
    for(let i = 0; i < 8; i++) {
      if(matrix[row][i] === valueInMatrix && i !== col)
        return false;
    }
    return true;
  }

  function findInColumns(row,col, valueInMatrix) {
    for(let i = 0; i < 8; i++) {
      if(matrix[i][col] === valueInMatrix && i !== row)
        return false;
    }
    return true;
  }

  function findInSquare(row,col, valueInMatrix) {
    for(let i = Math.floor((row)/3)*3; i < Math.ceil((row)/3)*3; i++) {
      for(let j = Math.floor((col)/3)*3; j < Math.ceil((col)/3)*3; j++){
        if(matrix[i][j] === valueInMatrix && i !== row && j !== col)
          return false;
      }
    }
    return true;
  }
  
  return matrixSudoku;
}
