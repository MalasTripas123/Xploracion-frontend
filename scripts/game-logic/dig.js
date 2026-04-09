import { showNotification } from '../ui/notif.js';
import { gameState, elements } from '../state.js';
import { renderGameState } from '../ui.js';
import { draw } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function dig() {
    const currentPlayer = gameState.players[gameState.turn];
    // retorna si el jugador no tiene dinero
    if (currentPlayer.coins < 2) return showNotification("Monedas insuficientes!");

    draw(1, currentPlayer);
    currentPlayer.coins -= 2;

    showNotification("Acción: Excavar ejecutada. ¡Busca el tesoro!");
    gameState.turnState = 'paused';
    renderGameState(gameState);
}