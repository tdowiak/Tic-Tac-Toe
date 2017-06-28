const ticTacApp = () => {

  let board = [[' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' ']];


  let turn = 'X';


  const renderBoard = () => {
    const gameBoard = document.getElementById('GameBoard');
    gameBoard.innerHTML='';
    for (var i=0; i<board.length; i++) {
      gameBoard.innerHTML += getRow(board[i], i);
    };

    checkForWin();
    boardSpaceClickHandler();
  };


  const getRow = (boardRow, rowNumber) => {
    const row = '<tr data-row = "'+rowNumber+'">'
    + '<td class ="boardSpace" data-col="0">' + boardRow[0] + '</td>'
    + '<td class ="boardSpace" data-col="1">' + boardRow[1] + '</td>'
    + '<td class ="boardSpace" data-col="2">' + boardRow[2] + '</td>'
    + '</tr>';

    return row;
  };


  const restartGame = () => {
    board = [[' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']];

    renderBoard();
    removeWinnerMessage();
  };


  const checkForWin = () => {

    if (board[0][0]===board[1][1] && board[0][0]===board[2][2]){
      if(board[0][0]!==' '){
        winnerMessage(board[0][0]);
        updateScoreboardData(board[0][0]);
        return;
      }
    } else if (board[2][0]===board[1][1] && board[2][0]===board[0][2]){
      if (board[2][0]!==' '){
        winnerMessage(board[2][0]);
        updateScoreboardData(board[2][0]);
        return;
      }
    }


    for (var i=0; i<3; i++){
      if (board[i][0]===board[i][1] && board[i][0]===board[i][2]){
        if (board[i][0]!==' '){
          winnerMessage(board[i][0]);
          updateScoreboardData(board[i][0]);
          return;
        }
      }else if (board[0][i]===board[1][i] && board[0][i]===board[2][i]){
        if (board[0][i]!==' '){
          winnerMessage(board[0][i]);
          updateScoreboardData(board[0][i]);
          return;
        }
      }
    }
  };


  const winnerMessage = (winner) => {
    if(winner==='X'){
      const xMessage = document.getElementById("X_Wins");
      xMessage.classList.remove("hidden");
    }else if(winner==='O'){
      const oMessage = document.getElementById("O_Wins");
      oMessage.classList.remove("hidden");
    }
  };



  const markSpace = (rowNumber, columnNumber) => {
    let boardSpace = board[rowNumber][columnNumber];

    if(spaceAvailable(boardSpace)){
      board[rowNumber][columnNumber] = turn;
      renderBoard();
      swapTurns();
    }
  };


  const spaceAvailable = (spaceValue) => {
    if(spaceValue!==' '){
      return false;
    } else return true;
  };


  const boardSpaceClickHandler = () => {
    const boardSpaces = document.getElementsByClassName('boardSpace');
    Array.from(boardSpaces).forEach((space) => {
      space.addEventListener('click', (e) => {
        const row = e.target.parentElement;
        const rowNumber = row.getAttribute('data-row');
        const columnNumber = e.target.getAttribute('data-col');
        markSpace(rowNumber, columnNumber);
      });
    });
  };

  const swapTurns = () => {
    if (turn==='X'){
      turn = 'O';
    }else{
      turn = 'X';
    }
  };


  const restartButtonClickHandler = () => {
    button = document.getElementById("RestartGame");
    button.addEventListener("click", restartGame);
  };


  const removeWinnerMessage = () => {
    const xMessage = document.getElementById("X_Wins");
    const oMessage = document.getElementById("O_Wins");

    xMessage.classList.add("hidden");
    oMessage.classList.add("hidden");
  };

//scoreboard handled below here

  let scoreBoard = {
    x_wins: 0,
    o_wins: 0
  };


  const updateScoreboardData = (winner) => {
    if(winner==='X'){
      scoreBoard.x_wins++;
    }else if(winner==='O'){
      scoreBoard.o_wins++;
    }
    renderScores();
  };


  const getWins = (player) => {
    if(player==='X'){
      return scoreBoard.x_wins;
    }else if(player==='O'){
      return scoreBoard.o_wins;
    }
  };

  const renderScores = () => {
    let scores = document.getElementById("WinCount");
    scores.innerHTML = getScoreRow();
  };

  const getScoreRow = () => {
    let scoreRow = '<tr id="WinCount">'
      +'<td>'+getWins('X')+'</td>'
      +'<td>'+getWins('O')+'</td>'
      +'</tr>';

    return scoreRow;
  };


  renderBoard();
  restartButtonClickHandler();



};
