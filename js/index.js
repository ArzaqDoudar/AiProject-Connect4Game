let h, w;
let bwidth, bheight;
var Board = [];
let circles = []; //array of circle objects
const PLAYER_ONE = "P1";
const PLAYER_TWO = "P2";
const PLAYER_AI = "AI";
let currunt_player = PLAYER_ONE;
var availableLocations = [5, 5, 5, 5, 5, 5, 5];
let NoOfPlayer = 1
let level = 2;
let X = 0; // colunm No. from mouse click
let turns = 0;
var levelFromUser = localStorage.getItem('level') ;
var playerFromUser = localStorage.getItem('playerNo') ;
// let scoreAi = 0; // todo 
// let scoreHuman = 0; // todo 
// const SCORE_WIN = 1000000
// let game_on = true;

startGame()

if (levelFromUser == "easy") {
  console.log("level easy")
  level = 0;
} else if (levelFromUser == "medium") {
  console.log("level medium")
  level = 1;
} else if (levelFromUser == "hard") {
  console.log("level hard")
  level = 2;
}

if (playerFromUser == "one") {
  console.log("One Player")
  NoOfPlayer = 1;
} else if (playerFromUser == "two") {
  console.log("Two Players")
  NoOfPlayer = 2;
}


// console.log("level = " , level)
// console.log("NoOfPlayer = " , NoOfPlayer)

function startGame() {
  currunt_player = PLAYER_ONE;
  circles = [];
  turns = 0;
  defineMatrix();
  availableLocations = [5, 5, 5, 5, 5, 5, 5];
}

function exitGame() {
  window.open('index.html', '_self');
}

function defineMatrix() {
  for (var i = 0; i < 6; i++) {
    Board[i] = [];
    for (var j = 0; j < 7; j++) {
      Board[i][j] = 0;
    }
  }
}


function setup() {
  let board = document.querySelector(".board");
  bwidth = board.offsetWidth;
  bheight = board.offsetHeight;
  w = int(bwidth / 7);
  h = int(bheight / 6);
  let canvas = createCanvas(bwidth, bheight);
  canvas.parent("board");
  canvas.style('border-radius', '35px');
}

function draw() {
  stroke(150);
  fill(255);
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      rect(i * w, j * h, w, h);
    }
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].ellipse();

    if (circles[i].lifespan <= 0) {
      circles.splice(i, 1); // 1 to replace 
    }
  }
  if (currunt_player == PLAYER_AI) {
    let column = ComputerPlayer();
    DropPeice(column);
    currunt_player = PLAYER_ONE;
  }



  


}

function Circle(x, y, p) {
  let r, g, b, size;
  size = w * 0.8;

  this.row = 5 - int(mouseY / h);
  this.col = int(mouseX / w);

  if (p == PLAYER_ONE) {
    this.player = PLAYER_ONE;
    r = 255;
    g = 255;
    b = 102;
  } else {
    this.player = 'Other';
    r = 32;
    g = 183;
    b = 189;
  }

  this.ellipse = function () {
    noStroke();
    fill(r, g, b);
    ellipse(x, y, size, size);
  }
}

function mouseClicked(event) {
  if (mouseX <= bwidth && mouseY <= bheight && mouseX >= 0 && mouseY >= 0) {
    game_on = true;
    X = int(mouseX / w);
    DropPeice(X);
    if (currunt_player === PLAYER_ONE) {
      if (NoOfPlayer == 1) {
        currunt_player = PLAYER_AI;
      } else {
        currunt_player = PLAYER_TWO;
      }
      game_on = false;
    } else {
      currunt_player = PLAYER_ONE;
      game_on = false;
    }
  }
}

function DropPeice(col) {
  if (availableLocations[col] >= 0) {
    let row = 5 - availableLocations[col];
    let cx = col * w + w / 2;
    let cy = (availableLocations[col]) * h + h / 2;
    availableLocations[col]--;
    circles.push(new Circle(cx, cy, currunt_player));
    Board[row][col] = currunt_player;

    let flag = checkWin(Board, currunt_player);
    turns++;
    if (flag) {
      winner();
    }

    if (currunt_player == PLAYER_ONE) {
      document.getElementById("playerCircle").style.width = w * 0.7 + 'px';
      document.getElementById("playerCircle").style.height = w * 0.7 + 'px';
      document.getElementById("playerCircle").style.backgroundColor = "#20b7bd";
      document.getElementById("playerNo").style.color = "#20b7bd";
      if (NoOfPlayer == 1) {
        document.getElementById("playerNo").innerHTML = "Computer";
      } else {
        document.getElementById("playerNo").innerHTML = "Player Two";
      }
    } else {
      document.getElementById("playerNo").innerHTML = "Player One";
      document.getElementById("playerCircle").style.width = w * 0.7 + 'px';
      document.getElementById("playerCircle").style.height = w * 0.7 + 'px';
      document.getElementById("playerCircle").style.backgroundColor = "#FFFF66";
      document.getElementById("playerNo").style.color = "#FFFF66";
    }
  }
}

function checkWin(board, piece) {
  let winSequence = 0;
  for (let c = 0; c < 4; c++) { // check Horizantal win
    for (let r = 0; r < 6; r++) {
      for (let i = 0; i < 4; i++) {
        if (board[r][c + i] == piece) {
          winSequence++;
        }
        if (winSequence == 4) return true;
      }
      winSequence = 0;
    }
  }
  for (let c = 0; c < 7; c++) { // check vertical win 
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 4; i++) {
        if (board[r + i][c] == piece) {
          winSequence++;
        }
        if (winSequence == 4) return true;
      }
      winSequence = 0;
    }
  }
  for (let c = 0; c < 4; c++) { // check diagonal 1 win
    for (let r = 3; r < 6; r++) {
      for (let i = 0; i < 4; i++) {
        if (board[r - i][c + i] == piece) {
          winSequence++;
        }
        if (winSequence == 4) return true;
      }
      winSequence = 0;
    }
  }
  for (let c = 0; c < 4; c++) { // check  diagonal 2 win
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 4; i++) {
        if (board[r + i][c + i] == piece) {
          winSequence++;
        }
        if (winSequence == 4) return true;
      }
      winSequence = 0;
    }
  }
  return false;
}

function winner() {
  if (currunt_player == PLAYER_ONE) {
    console.log("Yellow Win !! ");
    localStorage.setItem('winner', 'Yellow');
    window.open('winningPage.html', '_self');
  } else {
    console.log("Blue Win !!");
    localStorage.setItem('winner', 'Blue');
    window.open('winningPage.html', '_self');
  }
}

// // change value of level & No Of players

// var levelFromUser;
// var playerFromUser;

function ChangeLevel(choice) {
  levelFromUser = choice;
}

// if (levelFromUser == "easy" ) {
//   console.log("easy")
//   level = 0;
// }else if(levelFromUser == "medium"){
//   console.log("medium")

//   level = 1
// }else if(levelFromUser == "hard"){
//   console.log("hard")

//   level = 2;
// }


function ChangePlayerNo(choice) {
  playerFromUser = choice;
}

if (levelFromUser == "one") {
  NoOfPlayer = 1;
} else if (levelFromUser == "two") {
  NoOfPlayer = 1
}
