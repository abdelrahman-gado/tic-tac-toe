// put everthing in IIFE, to clean global scope
(()=> {

    // get player names from local storage
    const player1Name = localStorage.getItem("player1Name");
    const player2Name = localStorage.getItem("player2Name");

    // get player choices either X or O for which player from local storage
    const playerOneChoice = localStorage.getItem("playerOneChoice");
    const playerTwoChoice = localStorage.getItem("playerTwoChoice");

    
    const player1HeadingName = document.querySelector("#name1");
    player1HeadingName.textContent = player1Name;  // display player name 

    const player2HeadingName = document.querySelector("#name2");
    player2HeadingName.textContent = player2Name;  // display player name

    const player1Choice = document.querySelector("#choice1");
    // display player one choice with additional space to make it readable
    player1Choice.textContent += " " + playerOneChoice; 


    const player2Choice = document.querySelector("#choice2");
    // display player two choice with additional space to make it readable
    player2Choice.textContent += " " + playerTwoChoice;

    const gameEndingDiv = document.querySelector(".game-end");

    const gameBoardDiv = document.querySelector(".game-board");

    const gameMsgHeading = document.querySelector("#winner-msg");

    const restartBtn = document.querySelector("#restartBtn");

    // create two player objects from the factory function
    // each object has it name and it choice either X or O
    const playerOne = player(player1Name, playerOneChoice);
    const playerTwo = player(player2Name, playerTwoChoice);


    // create myGameBoard object as a Module pattern, it contains
    // whose turn is now ( 1 is for ==> player one, 2 is for ==> player two)
    // contains also gameBoard array resamble the buttons of the game.
    myGameBoard = (() => {
        let turn = 1;
        let gameBoard = [ 0, 0, 0,
                          0, 0, 0,
                          0, 0, 0 ];
        return {turn, gameBoard}; 
    })();


    const cellBtns = document.querySelectorAll(".cell");
    cellBtns.forEach((btn) => {
        btn.addEventListener("click", playTurn);
    });

    
    restartBtn.addEventListener("click", (e) => {
        localStorage.clear();
        window.location.href = "./index.html"; // return to starter page
    });


    function playTurn(e) {
        
        // change the turn every time.
        if (myGameBoard.turn === 1) {
            e.target.value = playerOne.choice;
            myGameBoard.gameBoard[e.target.dataset.index] = playerOne.choice;
            checkWinner(myGameBoard.gameBoard, playerOne.choice, playerOne.name);
            myGameBoard.turn = 2;
        } else {
            e.target.value = playerTwo.choice;
            myGameBoard.gameBoard[e.target.dataset.index] = playerTwo.choice;
            checkWinner(myGameBoard.gameBoard, playerTwo.choice, playerTwo.name);
            myGameBoard.turn = 1;
        }
        
        // disable buttons to not let players change the game.
        e.target.disabled = true;
        checkTie();
    
    }

    // see if all button are disabled, then there is a tie
    function checkTie() {
        let flag = false;
        cellBtns.forEach((btn) => {
            if (btn.disabled === false) {
                flag = true;
                return;
            }
        });

        // if there is a tie, display restart button and game message.
        if (!flag) {
            gameBoardDiv.style.display = "none";
            gameMsgHeading.textContent = "It a Tie";
            gameEndingDiv.style.display = "flex";
        }
    }
    

    // check if all cells in the row or a column have the same choice. if so, display
    // restart button and game message.
    function checkWinner(gameBoard, choice, playerName) {
        if ((gameBoard[0] === choice && gameBoard[1] === choice && gameBoard[2] === choice) ||
            (gameBoard[3] === choice && gameBoard[4] === choice && gameBoard[5] === choice) ||
            (gameBoard[6] === choice && gameBoard[7] === choice && gameBoard[8] === choice) ||
            (gameBoard[0] === choice && gameBoard[3] === choice && gameBoard[6] === choice) ||
            (gameBoard[1] === choice && gameBoard[4] === choice && gameBoard[7] === choice) ||
            (gameBoard[2] === choice && gameBoard[5] === choice && gameBoard[8] === choice)
        ) {
            gameBoardDiv.style.display = "none";
            gameMsgHeading.textContent = "winner is " + playerName;
            gameEndingDiv.style.display = "flex";
        }
    }
    
    // factory function for players object
    function player(playerName, playerChoice) {
        let name = playerName;
        let choice = playerChoice;
        return {name, choice};
    }


})();
