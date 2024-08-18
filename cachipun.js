const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startGame() {
    rl.question("¿Cuántas veces deseas jugar contra la computadora? ", (rounds) => {
        rounds = parseInt(rounds);

        if (isNaN(rounds) || rounds <= 0) {
            console.log("Por favor, ingresa un número válido de rondas.");
            rl.close();
            return;
        }

        const choices = ["piedra", "papel", "tijera"];
        let userPoints = 0;
        let computerPoints = 0;

        let playRound = (currentRound) => {
            if (currentRound >= rounds) {
                console.log("\n=====================");
                console.log("   RESULTADOS FINALES");
                console.log("=====================");
                console.log(`Puntos del Usuario: ${userPoints}`);
                console.log(`Puntos de la Máquina: ${computerPoints}`);

                if (userPoints > computerPoints) {
                    console.log("\n¡Felicidades! Ganaste el juego.");
                } else if (userPoints < computerPoints) {
                    console.log("\nLa máquina ganó el juego. ¡Mejor suerte la próxima vez!");
                } else {
                    console.log("\nEl juego terminó en empate.");
                }

                console.log("\n=====================\n");

                rl.question("¿Quieres volver a jugar? (si/no): ", (answer) => {
                    if (answer.toLowerCase() === 'si') {
                        startGame(); // Reiniciar el juego
                    } else {
                        console.log("¡Gracias por jugar!");
                        rl.close(); // Cerrar la interfaz y terminar el programa
                    }
                });

                return;
            }

            console.log(`\n--- Ronda ${currentRound + 1} de ${rounds} ---`);

            rl.question("Elige: Piedra, Papel o Tijera: ", (userChoice) => {
                userChoice = userChoice.toLowerCase();

                if (!choices.includes(userChoice)) {
                    console.log("Opción no válida. Por favor, elige Piedra, Papel o Tijera.");
                    playRound(currentRound); // Repite la misma ronda
                    return;
                }

                let computerChoice = Math.floor(Math.random() * 3);
                let computerMove = choices[computerChoice];

                if (userChoice === computerMove) {
                    console.log(`Ronda ${currentRound + 1}: ¡Empate! Ambos eligieron ${userChoice}.`);
                } else if (
                    (userChoice === "piedra" && computerMove === "tijera") ||
                    (userChoice === "papel" && computerMove === "piedra") ||
                    (userChoice === "tijera" && computerMove === "papel")
                ) {
                    console.log(`Ronda ${currentRound + 1}: ¡Felicidades! Ganaste esta ronda. La máquina eligió ${computerMove}.`);
                    userPoints++; // Aumenta el puntaje del usuario
                } else {
                    console.log(`Ronda ${currentRound + 1}: Perdiste esta ronda. La máquina eligió ${computerMove}.`);
                    computerPoints++; // Aumenta el puntaje de la máquina
                }

                playRound(currentRound + 1);
            });
        };

        playRound(0);
    });
}

startGame();