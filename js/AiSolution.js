function ComputerPlayer() {
  let col;
  if (level == 0) {
    col = alphabeta(Board, 1, -Infinity, Infinity, true)[1];
  } else if (level == 1) {
    col = alphabeta(Board, 3, -Infinity, Infinity, true)[1];
  } else {
    col = alphabeta(Board, 5, -Infinity, Infinity, true)[1];
  }
  return col;
}

function evaluation_function(window, piece) {
  // debugger;
  let ai = 0;
  let human = 0;
  let empty = 0;
  for (let i = 0; i < window.length; i++) {
    ai += (window[i] == PLAYER_AI) ? 1 : 0;
    human += (window[i] == PLAYER_ONE) ? 1 : 0;
    empty += (window[i] == 0) ? 1 : 0;
  }
  let score = 0;
  if (ai == 4) {
    score += 500001;
  } else if (ai == 3 && empty == 1) {
    score += 5000;
  } else if (ai == 2 && empty == 2) {
    score += 500;
  } else if (human == 2 && empty == 2) {
    score -= 501;
  } else if (human == 3 && empty == 1) {
    score -= 5001;
  } else if (human == 4) {
    score -= 500000;
  }
  return score;
}

function score_position(board, piece) {
  let score = 0;
  let window = [];
  let count = 0;
  let center_array = [];
  let row_array = [];
  let col_array = [];

  for (let i = 0; i < 6; i++) {
    center_array[i] = board[i][3];
    if (center_array[i] == piece) count++;
  }
  score += count * 3;

  // Score Horizontal 
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      row_array[c] = board[r][c];// get one row from board 
    }
    for (let c = 0; c < 4; c++) {
      for (let i = 0; i < 4; i++) {
        window[i] = row_array[c + i];
      }
      // console.log("Set = ", window);
      let e = evaluation_function(window, piece);
      score += e;
    }
  }

  // Score Vertical 
  for (let i = 0; i < 7; i++) {
    for (let r = 0; r < 6; r++) { // get one column from board
      col_array[r] = board[r][i];
    }
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 4; k++) {
        window[k] = col_array[j + k];
      }
      // console.log("Set = ", window);
      let e = evaluation_function(window, piece);
      score += e;
    }
  }

  // Score +ve diagonal
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      row_array[c] = board[r][c];
    }
    for (let c = 0; c < 4; c++) {
      for (let j = 0; j < 4; j++) {
        window[j] = board[r + j][c + j];
      }
      // console.log("Set = ", window);
      let e = evaluation_function(window, piece);
      score += e;
    }
  }

  // Score -ve diagonal
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      row_array[c] = board[r][c];
      for (let c = 0; c < 4; c++) {
        for (let j = 0; j < 4; j++) {
          window[j] = board[r + 3 - j][c + j];
        }
        // console.log("Set = ", window);
        let e = evaluation_function(window, piece);
        score += e;
      }

    }
  }

  return score;
  
}

function makeMove(board, col, piece) {
  for (let r = 0; r < 6; r++) {
    if (board[r][col] == 0) {
      board[r][col] = piece;
      break;
    }
  }
}

function alphabeta(board, depth, alpha, beta, maximizingPlayer) {

  // console.log("Board = ", Board);
  if (depth === 0 || depth >= (42 - turns)) {
    return [score_position(board, PLAYER_AI), -1];
  }
  if (maximizingPlayer) {
    let movesSoFar = [-Infinity, -1]; // [score , col]
    if (checkWin(board, PLAYER_AI)) {// changed to PLAYER_AI from PLAYER_ONE
      return movesSoFar;
    }
    for (let c = 0; c < 7; c++) {
      if (board[5][c] == 0) { // full column board
        let newBoard = board.map(row => {
          return row.map(col => {
            return col;
          });
        });
        makeMove(newBoard, c, PLAYER_AI);
        let score = alphabeta(newBoard, depth - 1, alpha, beta, false)[0];
        if (score > movesSoFar[0]) {
          movesSoFar = [score, c];
        }
        alpha = Math.max(alpha, movesSoFar[0]);
        if (alpha >= beta) break;
      }
    }
    return movesSoFar;
  } else {
    let movesSoFar = [Infinity, -1];
    if (checkWin(board, PLAYER_AI)) {
      return movesSoFar;
    }
    for (let c = 0; c < 7; c++) {
      if (board[5][c] == 0) {
        // let newBoard = board;
        let newBoard = board.map(row => {
          return row.map(col => {
            return col;
          });
        });
        makeMove(newBoard, c, PLAYER_ONE);
        let score = alphabeta(newBoard, depth - 1, alpha, beta, true)[0];
        if (score < movesSoFar[0]) {
          movesSoFar = [score, c];
        }
        beta = Math.min(beta, movesSoFar[0]);
        if (alpha >= beta) break;
      }
    }
    return movesSoFar;
  }
}
