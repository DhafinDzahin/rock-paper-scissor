const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const playerChoice = document.getElementById('player-choice');
const playerScoreCounter = document.getElementById('playerScore');
const computerScoreCounter = document.getElementById('computerScore');
const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissor = document.getElementById('computer-scissor');
const computerChoice = document.getElementById('computer-choice');
const announcementText = document.getElementById('text-announcement');
const gameScreen = document.getElementById('game-screen');
const winnerScreen = document.getElementById('winner-screen');
const winnerAnnouncement = document.getElementById('winner-announcement');
const winnerImage = document.getElementById('winner-image');
const resetButton = document.getElementById('reset-button');
let playerScore = 0;
let computerScore = 0;

function getWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) return;
    if (
        playerSelection === 'rock' && computerSelection == 'scissor' ||
        playerSelection === 'paper' && computerSelection == 'rock' ||
        playerSelection === 'scissor' && computerSelection == 'paper'
    ) return 'player';
    return 'computer';
}

function updateScore(scoreToBeUpdate) {
    if (scoreToBeUpdate === playerScoreCounter) {
        playerScoreCounter.textContent = ++playerScore;
        announcementText.textContent = 'Player Win';
    }
    else {
        computerScoreCounter.textContent = ++computerScore;
        announcementText.textContent = 'Computer Win';
    }
}

function computerPickAnimation(pick) {
    if (pick === 'rock') computerRock.classList.add('active');
    if (pick === 'paper') computerPaper.classList.add('active');
    if (pick === 'scissor') computerScissor.classList.add('active');
}

function resetAnimation() {
    Array.from(playerChoice.children).forEach(choice => choice.classList.remove('active'));
    Array.from(computerChoice.children).forEach(choice => choice.classList.remove('active'));
}

function playRound(playerSelection) {
    resetAnimation();
    const computerSelection = ['rock', 'paper', 'scissor'][Math.floor(Math.random() * 3)];
    playerSelection.classList.add('active');
    computerPickAnimation(computerSelection);
    const winner = getWinner(playerSelection.id, computerSelection);

    if (winner === 'player') updateScore(playerScoreCounter);
    else if (winner === 'computer') updateScore(computerScoreCounter);
    else announcementText.textContent = 'Draw';

    if (playerScore === 5 || computerScore === 5) endGame();
}

function endGame() {
    gameScreen.style.display = 'none';
    winnerScreen.style.display = 'flex';

    if (playerScore > computerScore) {
        winnerAnnouncement.textContent = 'PLAYER WIN';
        winnerImage.src = "/image/player.png";
    }
    else {
        winnerAnnouncement.textContent = 'COMPUTER WIN';
        winnerImage.src = "/image/computer.png";
    }
}

Array.from(playerChoice.children).forEach(choice => choice.addEventListener('click', () => playRound(choice)));
resetButton.addEventListener('click', () => {
    gameScreen.style.display = 'block';
    winnerScreen.style.display = 'none';
    playerScore = 0;
    computerScore = 0;
    playerScoreCounter.textContent = playerScore;
    computerScoreCounter.textContent = computerScore;
    announcementText.textContent = ''
    resetAnimation()
});