// initialize both scores to 0 at start
let playerScore = 0, cpuScore = 0

let playerImg = document.getElementById('player-selection')
let cpuImg = document.getElementById('cpu-selection')

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

// adjust graphical components for representing player and CPU choice per-round
function adjustGraphics(playerChoice, cpuChoice) {
    document.getElementById('vs').style.display = "block";
    // handle player selection graphic
    switch(playerChoice) {
        case "rock":
            playerImg.src = "/images/rock.PNG"
            playerImg.style.display = "block"
            break;
        case "paper":
            playerImg.src = "/images/paper.png"
            playerImg.style.display = "block"
            break;
        case "scissors":
            playerImg.src = "/images/scissors.png"
            playerImg.style.display = "block"
            break;
        default:
            break;
    }

    switch(cpuChoice) {
        case "rock":
            cpuImg.src = "/images/rock.png"
            cpuImg.style.display = "block"
            break;
        case "paper":
            cpuImg.src = "/images/paper.png"
            cpuImg.style.display = "block"
            break;
        case "scissors":
            cpuImg.src = "/images/scissors.png"
            cpuImg.style.display = "block"
            break;
        default:
            break;
    }
}

// handle calculation of wins/losses
function playRound(playerChoice=computerPlay()) {
    let cpuChoice = computerPlay();
    adjustGraphics(playerChoice, cpuChoice);
    switch(playerChoice) {
        case "rock":
            if(cpuChoice == "rock") return "Tie";
            if(cpuChoice == "paper"){
                adjustScore('lose');
                return "Lose";
            }
            if(cpuChoice == "scissors"){
                adjustScore('win');
                return "Win";
            }
            break;
        case "paper":
            if(cpuChoice == "rock"){
                adjustScore('win');
                return "Win";
            }
            if(cpuChoice == "paper") return "Tie";
            if(cpuChoice == "scissors"){
                adjustScore('lose');
                return "Lose";
            }
            break;
        case "scissors":
            if(cpuChoice == "rock"){
                adjustScore('lose');
                return "Lose";
            }
            if(cpuChoice == "paper"){
                adjustScore('win');
                return "Win";
            }
            if(cpuChoice == "scissors") return "Tie";
            break;
        default:
            return "Error!";
    }
}

// handle main gameplay logic
function game() {
    let roundCount = 0;
    const gameSectionRef = document.querySelector('.game-section');

    // hold outcome of each round, plus running total
    let outcomeDiv = document.createElement('div'); 
    outcomeDiv.setAttribute('class', 'outcome');

    let result = document.createElement('p');
    result.setAttribute('id', 'result')
    let runningTotal = document.createElement('p');
    let winnerDisplay = document.createElement('p');
    let roundsLeft = document.createElement('p');

    // assign initial values for display elements
    roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
    runningTotal.textContent = "Current score:\n P 0 / CPU 0";
    
    // add display elements to the game container
    outcomeDiv.appendChild(result);
    outcomeDiv.appendChild(runningTotal);
    gameSectionRef.appendChild(outcomeDiv);
    gameSectionRef.appendChild(winnerDisplay);
    gameSectionRef.appendChild(roundsLeft);

    // adjust color of result area based on outcome of each round
    function checkResultStatus() {
        if(result.textContent == "Win"){
            result.style.backgroundColor = 'Green';
        } else if(result.textContent == "Tie"){
            result.style.backgroundColor = 'rgb(138, 138, 123)';
        } else if(result.textContent == "Lose"){
            result.style.backgroundColor = 'red';
        }
    }

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

        const resetBtn = document.querySelector('#reset');

        // listen for click events to choose either rock paper or scissors
        // then play a single round with that selection
        rockBtn.addEventListener('click', function () {
            if(roundCount < 5){
                result.textContent = playRound('rock');
                checkResultStatus();
                runningTotal.textContent = `Current score:\n 
                    P ${playerScore} / CPU ${cpuScore}`;
                roundCount++; // increment # of rounds played
                roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
                console.log(roundCount);
                if(roundCount >= 5) winnerDisplay.textContent = getWinner();
            }
        });
    
        paperBtn.addEventListener('click', function() {
            if(roundCount < 5){
                result.textContent = playRound('paper');
                checkResultStatus();
                runningTotal.textContent = `Current score:\n 
                    P ${playerScore} / CPU ${cpuScore}`;
                roundCount++;
                roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
                console.log(roundCount);
                if(roundCount >= 5) winnerDisplay.textContent = getWinner();
            }
        });
        
        scissorsBtn.addEventListener('click', function() {
            if(roundCount < 5){
                result.textContent = playRound('scissors');
                checkResultStatus();
                runningTotal.textContent = `Current score:\n 
                    P ${playerScore} / CPU ${cpuScore}`;
                roundCount++;
                roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
                console.log(roundCount);
                if(roundCount >= 5) winnerDisplay.textContent = getWinner();
            }
        });

        resetBtn.addEventListener('click', function(){
            roundCount = 0;
            roundsLeft.textContent = `Number of rounds left: ${5 - roundCount}`;
            playerScore = 0, cpuScore = 0;
            playerImg.style.display = "none";
            cpuImg.style.display = "none";
            document.getElementById('vs').style.display = "none";
            result.style.backgroundColor = "rgb(138, 138, 123)";
            result.textContent = "";
            runningTotal.textContent = `Current score:\n 
                P ${playerScore} / CPU ${cpuScore}`;
            winnerDisplay.textContent = "";
        });
}

game()