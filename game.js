// initialize both scores to 0 at start
let playerScore = 0, cpuScore = 0

function computerPlay() {
    let cpuGuess = Math.floor(Math.random()*3);
    switch(cpuGuess) {
        case 0:
            return"rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";        
        default:
            return "unrecognized shape";
    }
}

// handle adjustment of scores for player and computer
function adjustScore(gameOutcome) {
    switch(gameOutcome) {
        case "win":
            playerScore++;
            break;
        case "lose":
            cpuScore++;
            break;
        default:
            break;
    }
}

// handle calculation of wins/losses
function playRound(playerChoice=computerPlay()) {
    let cpuChoice = computerPlay();
    switch(playerChoice) {
        case "rock":
            if(cpuChoice == "rock") return "tie";
            if(cpuChoice == "paper"){
                adjustScore('lose');
                return "lose";
            }
            if(cpuChoice == "scissors"){
                adjustScore('win');
                return "win";
            }
            break;
        case "paper":
            if(cpuChoice == "rock"){
                adjustScore('win');
                return "win";
            }
            if(cpuChoice == "paper") return "tie";
            if(cpuChoice == "scissors"){
                adjustScore('lose');
                return "lose";
            }
            break;
        case "scissors":
            if(cpuChoice == "rock"){
                adjustScore('lose');
                return "lose";
            }
            if(cpuChoice == "paper"){
                adjustScore('win');
                return "win";
            }
            if(cpuChoice == "scissors") return "tie";
            break;
        default:
            return "error";
    }
}

// handle main gameplay logic
function game() {
    let roundCount = 0;
    const bodyRef = document.querySelector('.game-section');

    // hold outcome of each round, plus running total
    let outcomeDiv = document.createElement('div'); 
    outcomeDiv.setAttribute('class', 'outcome');

    let result = document.createElement('p');
    let runningTotal = document.createElement('p');
    let winnerDisplay = document.createElement('p');
    let roundsLeft = document.createElement('p');

    // assign initial values for display elements
    roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
    runningTotal.textContent = "Current score:\n P 0 / CPU 0";
    
    // add display elements to the game container
    outcomeDiv.appendChild(result);
    outcomeDiv.appendChild(runningTotal);
    bodyRef.appendChild(outcomeDiv);
    bodyRef.appendChild(winnerDisplay);
    bodyRef.appendChild(roundsLeft);

    // handle victory calculation
    function getWinner() {
        if(playerScore === cpuScore) return "Game ends in a tie!";
        if(playerScore < cpuScore) return "Computer wins the game, better luck next time!";
        if(playerScore > cpuScore) return "Player wins the game!";
    }
    
        // create reference to buttons for rock, paper, scissors
        const rockBtn = document.querySelector('#rock');
        const paperBtn = document.querySelector('#paper');
        const scissorsBtn = document.querySelector('#scissors');
    
        // listen for click events to choose either rock paper or scissors
        // then play a single round with that selection
        rockBtn.addEventListener('click', function () {
            result.textContent = playRound('rock');
            runningTotal.textContent = `Current score:\n 
                P ${playerScore} / CPU ${cpuScore}`;
            roundCount++; // increment # of rounds played
            roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
            console.log(roundCount);
            if(roundCount >= 5) winnerDisplay.textContent = getWinner();
        });
    
        paperBtn.addEventListener('click', function() {
            result.textContent = playRound('paper');
            runningTotal.textContent = `Current score:\n 
                P ${playerScore} / CPU ${cpuScore}`;
            roundCount++;
            roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
            console.log(roundCount);
            if(roundCount >= 5) winnerDisplay.textContent = getWinner();
        });
        
        scissorsBtn.addEventListener('click', function() {
            result.textContent = playRound('scissors');
            runningTotal.textContent = `Current score:\n 
                P ${playerScore} / CPU ${cpuScore}`;
            roundCount++;
            roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
            console.log(roundCount);
            if(roundCount >= 5) winnerDisplay.textContent = getWinner();
        });
}

game()