import { gameState } from "../state.js";
import { renderGameState } from "../ui.js";
import { showNotification } from "../ui/notif.js";

export function passTurn() {
    showNotification("Pasas el turno.");

    gameState.turn = (gameState.turn + 1) % gameState.players.length;
    gameState.currentRound += gameState.turn === 0 ? 1 : 0;
    gameState.totalTurns++;

    gameState.currentPlayerId = gameState.players[gameState.turn].id;
    gameState.turnState = 'initial';
    renderGameState(gameState);
}

export function autoPassTurn (seconds) {
    showNotification(`Se pasará automáticamente el turno en ${seconds} segundos`);
    const pressedTurn = gameState.totalTurns;
    setTimeout(() => {
        if (pressedTurn === gameState.totalTurns) passTurn();
    }, seconds*1000);
}