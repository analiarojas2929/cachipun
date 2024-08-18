let rounds;
let currentRound;
let userPoints;
let computerPoints;

const choices = ["piedra", "papel", "tijera"];

function startGame() {
    rounds = parseInt(document.getElementById('rounds').value);

    if (isNaN(rounds) || rounds <= 0) {
        alert("Por favor, ingresa un número válido de rondas.");
        return;
    }

    userPoints = 0;
    computerPoints = 0;
    currentRound = 0;

    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('roundInfo').textContent = `Ronda ${currentRound + 1} de ${rounds}`;
}

function playRound(userChoice) {
    if (currentRound >= rounds) return;

    let computerChoice = choices[Math.floor(Math.random() * 3)];
    let resultMessage = "";

    if (userChoice === computerChoice) {
        resultMessage = `Ronda ${currentRound + 1}: ¡Empate! Ambos eligieron ${userChoice}.`;
    } else if (
        (userChoice === "piedra" && computerChoice === "tijera") ||
        (userChoice === "papel" && computerChoice === "piedra") ||
        (userChoice === "tijera" && computerChoice === "papel")
    ) {
        resultMessage = `Ronda ${currentRound + 1}: ¡Felicidades! Ganaste esta ronda. La máquina eligió ${computerChoice}.`;
        userPoints++;
    } else {
        resultMessage = `Ronda ${currentRound + 1}: Perdiste esta ronda. La máquina eligió ${computerChoice}.`;
        computerPoints++;
    }

    alert(resultMessage);

    currentRound++;

    if (currentRound < rounds) {
        document.getElementById('roundInfo').textContent = `Ronda ${currentRound + 1} de ${rounds}`;
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('resultArea').style.display = 'block';

    let finalMessage = "El juego terminó en empate.";
    if (userPoints > computerPoints) {
        finalMessage = "¡Felicidades! Ganaste el juego.";
    } else if (userPoints < computerPoints) {
        finalMessage = "La máquina ganó el juego. ¡Mejor suerte la próxima vez!";
    }

    document.getElementById('userScore').textContent = `Puntos del Usuario: ${userPoints}`;
    document.getElementById('computerScore').textContent = `Puntos de la Máquina: ${computerPoints}`;
    document.getElementById('finalResults').textContent = finalMessage;
}


function restartGame() {
    document.getElementById('rounds').value = '';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('resultArea').style.display = 'none';
}