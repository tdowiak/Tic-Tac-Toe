const ticTacApp = () => {

  let board = [[' ', ' ', ' '],
              [' ', ' ', ' '],
              [' ', ' ', ' ']];


  let turn = 'X';


  function renderBoard() {
    const gameBoard = document.getElementById('GameBoard');
    gameBoard.innerHTML='';
    for (var i=0; i<board.length; i++) {
      gameBoard.innerHTML += getRow(board[i], i);
    };

    checkForWin();
    boardSpaceClickHandler();
  };


  function getRow(boardRow, rowNumber) {
    const row = '<tr data-row = "'+rowNumber+'">'
    + '<td class ="boardSpace" data-col="0">' + boardRow[0] + '</td>'
    + '<td class ="boardSpace" data-col="1">' + boardRow[1] + '</td>'
    + '<td class ="boardSpace" data-col="2">' + boardRow[2] + '</td>'
    + '</tr>';

    return row;
  };


  function restartGame(){
    board = [[' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']];

    renderBoard();
    console.log("New Game Started!");
  };


  function checkForWin(){
    const boardArray = board;

    if (boardArray[0][0]===boardArray[1][1] && boardArray[0][0]===boardArray[2][2]){
      if(boardArray[0][0]!==' '){
        winnerMessage(boardArray[0][0]);
        console.log("Game over. "+boardArray[0][0]+" Wins!!");
        return;
      }
    } else if (boardArray[2][0]===boardArray[1][1] && boardArray[2][0]===boardArray[0][2]){
      if (boardArray[2][0]!==' '){
        winnerMessage(boardArray[2][0]);
        console.log("Game over. "+boardArray[2][0]+" Wins!!");
        return;
      }
    }


    for (var i=0; i<3; i++){
      let row = boardArray[i];
      if (row[0]===row[1] && row[0]===row[2]){
        if (row[0]!==' '){
          winnerMessage(row[0]);
          console.log("Game over. "+row[0]+" Wins!!");
          return;
        }
      }else if (boardArray[0][i]===boardArray[1][i] && boardArray[0][i]===boardArray[2][i]){
        if (boardArray[0][i]!==' '){
          winnerMessage(boardArray[0][i]);
          console.log("Game over. "+boardArray[0][i]+" Wins!!");
          return;
        }
      }else {
        console.log("No winner yet");
      }
    }
  };


  const winnerMessage = (winner) => {
    if(winner==='X'){
      const xMessage = document.getElementById("xWins");
      xMessage.classList.remove("hidden");
    }else if(winner==='O'){
      const oMessage = document.getElementById("oWins");
      oMessage.classList.remove("hidden");
    }
  }


  function markSpace(rowNumber, columnNumber){
    let boardSpace = board[rowNumber][columnNumber];

    if(isSpaceAvailable(boardSpace)){
      board[rowNumber][columnNumber] = turn;
      renderBoard();
      swapTurns();
    }else{
      console.log("space is taken");
    }

  };


  function isSpaceAvailable(spaceValue) {
    if(spaceValue!==' '){
      return false;
    } else return true;
  };

  function boardSpaceClickHandler() {
    const boardSpaces = document.getElementsByClassName('boardSpace');
    Array.from(boardSpaces).forEach((space) => {
      space.addEventListener('click', (e) => {
        const row = e.target.parentElement;
        const rowNumber = row.getAttribute('data-row');
        const columnNumber = e.target.getAttribute('data-col');
        markSpace(rowNumber, columnNumber);
      });
    });
  }

  function swapTurns(){
    if (turn==='X'){
      turn = 'O';
    }else {
      turn = 'X';
    }
  }


  renderBoard();



};
