let BoardWidth = 3;
let currentPlayer = 1;
let moves = 0;
let boardState = generateEmptyBoardState();

const title = document.querySelector('.Title');
const playerHeading = document.querySelector('.playerHeading ');
const gameSquares = document.querySelectorAll('.square-btn');
const restartBtn = document.querySelector('.Restart');



gameSquares.forEach((gameSquare,index) =>{
    let row = Math.floor(index/BoardWidth);
    let col = index % BoardWidth ;
    gameSquare.addEventListener('click',() =>{makeMove(row,col,gameSquare)});
})

function setCurrentPlayerHeading(){
    playerHeading.innerText = `player ${currentPlayer}'s turn`;
}

function didPlayerWin(currentPlayer){
  const rows = [0,1,2];
  const wonHorizontal = rows.some((row)=>{
    return (
        boardState[row][0] === currentPlayer && 
        boardState[row][1] === currentPlayer &&  
        boardState[row][2] === currentPlayer
    )
  }
  )
  const cols =[0,1,2];
  const wonVertical = cols.some((col)=>{
    return (
        boardState[0][col] == currentPlayer && 
        boardState[1][col] == currentPlayer &&  
        boardState[2][col] == currentPlayer
    )
  }
  )
  
  const wonFirstDiagonal = ( 
    boardState[0][0] === currentPlayer && 
    boardState[1][1] === currentPlayer &&  
    boardState[2][2] === currentPlayer
    )
  
  const wonSecondtDiagonal = ( 
        boardState[0][2] === currentPlayer && 
        boardState[1][1] === currentPlayer &&  
        boardState[2][0] === currentPlayer
    )
           
  return (
    wonHorizontal||wonVertical||wonFirstDiagonal||wonSecondtDiagonal
  ) ;    
  
}

function endGame(){
   restartBtn.style.display = 'block';
   gameSquares.forEach(gameSquare=>{
    gameSquare.disabled = true;
   })
}


function generateEmptyBoardState(){
    return new Array(BoardWidth)
    .fill()
    .map(()=> new Array(BoardWidth).fill())
}



restartBtn.addEventListener('click',restartGame);

function restartGame(){
  boardState = generateEmptyBoardState();
  moves = 0 ;
  currentPlayer = 1;
  setCurrentPlayerHeading();
  gameSquares.forEach(gameSquare=>{
    gameSquare.innerText='';
    gameSquare.disabled = false;
  })
  restartBtn.style.display = 'none';
}


function makeMove(row,col,gameSquare){
    gameSquare.innerText = currentPlayer === 1 ? 'X' : '0' ;
    gameSquare.disabled = true;
    moves++;
    boardState[row][col] = currentPlayer ;

    if(didPlayerWin(currentPlayer)){
        playerHeading.innerText = `player ${currentPlayer} won`;
        endGame();
    }else if (moves > BoardWidth*BoardWidth){
        playerHeading.innerText = `It's a tie`;
        endGame();
    }else{
        currentPlayer = currentPlayer === 1 ? 2 : 1; 
        setCurrentPlayerHeading();
    }
}
