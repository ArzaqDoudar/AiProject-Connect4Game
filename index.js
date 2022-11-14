let h, w;
let bwidth, bheight;
var Matrix = [];
let player = false; // player 1  ==> false . player 2 ==> true
let circles = []; //array of circle objects
let playerNo = document.getElementById('playerNo')
var counters = [5, 5, 5, 5, 5, 5, 5]
startGame()

// Matrix[0][0] = "x";
// Matrix[0][1] = "x";
// Matrix[0][2] = "o";
// Matrix[0][3] = "x";



function startGame() {
  console.log('new game')
  player = false;
  circles = []
  defineMstrix()
  counters = [5, 5, 5, 5, 5, 5, 5]
  // localStorage.removeItem('winner')

}

function defineMstrix() {
  for (var i = 0; i < 6; i++) {
    Matrix[i] = [];
    for (var j = 0; j < 7; j++) {
      Matrix[i][j] = undefined;
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
  canvas.style('border-radius', '35px')
  //console.log("h = " , h , "w = " , w)
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

}
function mousePressed() {
  if (mouseX <= bwidth && mouseY <= bheight && mouseX >= 0 && mouseY >= 0) {

    let col = int(mouseX / w)

    if (counters[col] >= 0) {
      let rowIndex = counters[col]
      counters[col]--
      let row = 5 - rowIndex
      let cx = col * w + w / 2
      let cy = (rowIndex) * h + h / 2
      circles.push(new Circle(cx, cy));
      player = !player

      console.log('col = ', col, " row = ", row);
      if (player) {
        Matrix[row][col] = '1'
        document.getElementById("playerNo").innerHTML = "Player TWO";
        document.getElementById("playerCircle").style.width = w * 0.7 + 'px'
        document.getElementById("playerCircle").style.height = w * 0.7 + 'px'
        document.getElementById("playerCircle").style.backgroundColor ="#20b7bd"
      } else {
        Matrix[row][col] = ' 2'
        document.getElementById("playerNo").innerHTML = "Player ONE";
        document.getElementById("playerCircle").style.width = w * 0.7 + 'px'
        document.getElementById("playerCircle").style.height = w * 0.7 + 'px'
        document.getElementById("playerCircle").style.backgroundColor = "#FFFF66" 
      }

      if (checkWin(row, col)) {
        winner()
      }
    }



  }
}

function Circle(x, y) {
  let r, g, b, size
  size = w * 0.8;

  this.row = 5 - int(mouseY / h)
  this.col = int(mouseX / w)

  if (player) {
    this.player = 'two'
    r = 32;
    g = 183;
    b = 189;
  } else {
    this.player = 'one'
    r = 255;
    g = 255;
    b = 102;
  }

  this.ellipse = function () {
    noStroke();
    fill(r, g, b);
    ellipse(x, y, size, size);
  }

}

function checkWin(x, y) {
  let symbol = Matrix[x][y];
  console.log("player = ", player)
  if (x >= 3 && Matrix[x - 3][y] == symbol && Matrix[x - 2][y] == symbol && Matrix[x - 1][y] == symbol) { //vertical
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  }

  else if (y >= 3 && Matrix[x][y - 3] == symbol && Matrix[x][y - 2] == symbol && Matrix[x][y - 1] == symbol) { //horizantal 1
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (y >= 2 && y <= 5 && Matrix[x][y - 2] == symbol && Matrix[x][y - 1] == symbol && Matrix[x][y + 1] == symbol) { //horizantal 2
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (y >= 1 && y <= 4 && Matrix[x][y - 1] == symbol && Matrix[x][y + 1] == symbol && Matrix[x][y + 2] == symbol) { //horizantal 3
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }

  } else if (y <= 3 && Matrix[x][y + 1] == symbol && Matrix[x][y + 2] == symbol && Matrix[x][y + 3] == symbol) { //horizantal 4
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  }

  else if (x <= 2 && y >= 3 && Matrix[x + 1][y - 1] == symbol && Matrix[x + 2][y - 2] == symbol && Matrix[x + 3][y - 3] == symbol) { // \ Diagonal 1
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (x >= 1 && x <= 3 && y <= 2 && y >= 5 && Matrix[x - 1][y + 1] == symbol && Matrix[x + 1][y - 1] == symbol && Matrix[x + 2][y - 2] == symbol) { // \ Diagonal 2
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }

  } else if (x >= 2 && x <= 4 && y <= 1 && y >= 4 && Matrix[x - 2][y + 2] == symbol && Matrix[x - 1][y + 1] == symbol && Matrix[x + 1][y - 1] == symbol) { // \ Diagonal 3
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (x >= 3 && y <= 3 && Matrix[x - 3][y + 3] == symbol && Matrix[x - 2][y + 2] == symbol && Matrix[x - 1][y + 1] == symbol) { // \ Diagonal 4
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  }
  else if (x <= 2 && y <= 3 && Matrix[x + 1][y + 1] == symbol && Matrix[x + 2][y + 2] == symbol && Matrix[x + 3][y + 3] == symbol) { // / Diagonal 1
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (x >= 1 && x <= 3 && y <= 1 && y >= 4 && Matrix[x - 1][y - 1] == symbol && Matrix[x + 1][y + 1] == symbol && Matrix[x + 2][y + 2] == symbol) { // / Diagonal 2
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (x >= 2 && x <= 4 && y <= 2 && y >= 5 && Matrix[x - 2][y - 2] == symbol && Matrix[x - 1][y - 1] == symbol && Matrix[x + 1][y + 1] == symbol) { // / Diagonal 3
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }
  } else if (x >= 3 && y >= 3 && Matrix[x - 3][y - 3] == symbol && Matrix[x - 2][y - 2] == symbol && Matrix[x - 1][y - 1] == symbol) { // / Diagonal 4
    if (player) {
      console.log("Yellow Win !! ");
      localStorage.setItem('winner', 'Player ONE');
    } else {
      console.log("Blue Win !!")
      localStorage.setItem('winner', 'Player TWO');
    }

  }else if (counters[0]<0 && counters[1]<0 && counters[2]<0 && counters[3]<0 && counters[4]<0 && counters[5]<0 && counters[6]<0 ){
    // board if full
    localStorage.setItem('winner', 'No ONE , Play again');
    window.open('winningPage.html', '_self')
  }
  else {
    return false
  }
  return true
}

function winner() {

  window.open('winningPage.html', '_self')
}

