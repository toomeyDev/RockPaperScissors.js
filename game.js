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

function playRound(playerChoice=computerPlay(), cpuChoice=computerPlay()) {
    playerChoice = playerChoice.toLowerCase(); // make player input case-insensitive
    switch(playerChoice) {
        case "rock":
            if(cpuChoice == "rock") return "tie";
            if(cpuChoice == "paper") return "lose";
            if(cpuChoice == "scissors") return "win";
            break;
        case "paper":
            if(cpuChoice == "rock") return "win";
            if(cpuChoice == "paper") return "tie";
            if(cpuChoice == "scissors") return "lose";
            break;
        case "scissors":
            if(cpuChoice == "rock") return "lose";
            if(cpuChoice == "paper") return "win";
            if(cpuChoice == "scissors") return "tie";
            break;
        default:
            return "error";
    }
}

function game() {
    
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

    function getWinner() {
        if(playerScore === cpuScore) return "Game ends in a tie!";
        if(playerScore < cpuScore) return "Computer wins the game, better luck next time!";
        if(playerScore > cpuScore) return "Player wins the game!";
    }

    let playerScore = 0, cpuScore = 0;
    for(let i = 0; i < 5; i++) {
        let playerChoice = prompt("(Rock | Paper | Scissors): ");
        let cpuChoice = computerPlay();
        let outcome = playRound(playerChoice, cpuChoice);
        adjustScore(outcome);
        console.log(outcome + " score is : CPU(" + cpuScore +") Player(" + playerScore + ")");
    }
    console.log(getWinner());
}

game()