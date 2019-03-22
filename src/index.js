module.exports = function solveSudoku(matrix) {
  const matrixSudoku = matrix;
  let qttZeros = 0;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] === 0) {
        qttZeros++;
      }
    }
  }

  const zeroElementPosition = new Array(qttZeros);
  for (let i = 0; i < zeroElementPosition.length; i++) {
    zeroElementPosition[i] = new Array(2);
  }

  for (let row = 0, i = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] === 0) {
        zeroElementPosition[i][0] = row;
        zeroElementPosition[i][1] = col;
        i++;
      }
    }
  }

  let row, col;
  for (let i = 0; i < qttZeros; i++) {
    row = zeroElementPosition[i][0];
    col = zeroElementPosition[i][1];
    matrixSudoku[row][col]++;
    if(matrixSudoku[row][col] > 9) {
      matrixSudoku[row][col] = 0;
      i -= 2;
      continue;
    }
    for (let k = matrixSudoku[row][col]; k < 10; k++) {
      if ( findInRows(row, col, matrixSudoku[row][col]) 
           && findInColumns(row, col, matrixSudoku[row][col])
           && findInSquare(row, col, matrixSudoku[row][col]) )
        break;
      else matrixSudoku[row][col] = k;
      if ( (matrixSudoku[row][col] === 9 && !findInRows(row, col, matrixSudoku[row][col]))
           || (matrixSudoku[row][col] === 9 && !findInColumns(row, col, matrixSudoku[row][col]))
           || (matrixSudoku[row][col] === 9 && !findInSquare(row, col, matrixSudoku[row][col])) ) {
        matrixSudoku[row][col] = 0;
        i -= 2;
        break;
      }
    }
  }

  function findInRows(row,col, valueInMatrix) {
    for (let i = 0; i < 9; i++) {
      if (matrixSudoku[row][i] === valueInMatrix && i !== col)
        return false;
    } 
    return true;
  }

  function findInColumns(row,col, valueInMatrix) {
    for (let i = 0; i < 9; i++) {
      if (matrixSudoku[i][col] === valueInMatrix && i !== row)
        return false;
    }
    return true;
  }

  function findInSquare(row,col, valueInMatrix) {
    for (let i = Math.floor((row)/3)*3; i < (Math.floor((row)/3)*3)+3; i++) {
      for (let j = Math.floor((col)/3)*3; j < (Math.floor((col)/3)*3)+3; j++) {
        if (matrixSudoku[i][j] === valueInMatrix && i !== row && j !== col)
          return false;
      }
    }
    return true;
  }

  return matrixSudoku;
}
