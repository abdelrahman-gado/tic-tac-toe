// put everthing in IIFE, to clean global scope
(() => {
    const player1Inp = document.querySelector("#player1-inp");
    const player2Inp = document.querySelector("#player2-inp");
    
    // define players choices to store them in local storage to use them in game.index page.
    let playerOneChoice = "";
    let playerTwoChoice = "";
    
    const player1X = document.querySelector("#player1-X");
    const player1O = document.querySelector("#player1-O");
    
    const startBtn = document.querySelector("#startBtn");
    
    // make the player one choose X or O, then from this choice we can
    // know the choice of player two.
    player1X.addEventListener("click", (e) => {
        player1X.disabled = true;
        player1O.disabled = false;
        player1X.style.color = "red";
        player1O.style.color = "black";
        playerOneChoice = "X";
        playerTwoChoice = "O";
    });
    
    player1O.addEventListener("click", (e) => {
        player1O.disabled = true;
        player1X.disabled = false;
        player1O.style.color = "red";
        player1X.style.color = "black";
        playerOneChoice = "O";
        playerTwoChoice = "X";
    });
    
    startBtn.addEventListener("click", (e) => {
        const player1Name = player1Inp.value;
        const player2Name = player2Inp.value;

        // if any input is empty, alert user.
        if (player1Name.length === 0 || player2Name.length === 0 || playerOneChoice.length === 0 ||
            playerTwoChoice.length === 0) {
                
                alert("Please complete all infomation.");
                return;
        }


        localStorage.setItem("player1Name", player1Name);
        localStorage.setItem("player2Name", player2Name);
        localStorage.setItem("playerOneChoice", playerOneChoice);
        localStorage.setItem("playerTwoChoice", playerTwoChoice);


        window.location.href = "./game.html"; // go to game.index page
    });


})();



