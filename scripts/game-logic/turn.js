import { gameState } from "../state.js";
import { renderGameState } from "../ui.js";
import { showNotification } from "../ui/notif.js";
import { looseByCoins } from "./win-lose-condition.js";

export function passTurn() {
    if (gameState.turnState === 'win') {
        return;
    }
    showNotification("Pasas el turno.");
    if (looseByCoins()) showNotification(`El jugador ${gameState.players[gameState.turn].name} ha sido descalificado por pasar el turno sin monedas`);

    for (let i = 0; i < 7; i++) {
        gameState.turn = (gameState.turn + 1) % gameState.players.length;
        gameState.currentRound += gameState.turn === 0 ? 1 : 0;
        gameState.totalTurns++;

        if (gameState.players[gameState.turn].state === 'alive') break;
    }
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