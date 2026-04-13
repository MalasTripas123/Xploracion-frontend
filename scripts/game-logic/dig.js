import { showNotification } from '../ui/notif.js';
import { gameState, elements } from '../state.js';
import { renderGameState } from '../ui.js';
import { draw } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function dig() {
    const currentPlayer = gameState.players[gameState.turn];
    // retorna si el jugador no tiene dinero
    if (currentPlayer.coins < 2) return showNotification("Monedas insuficientes!");

    const drawnCard = draw(1, currentPlayer);
    currentPlayer.coins -= 2;

    showNotification(`Agarraste la pala y deciiste trabajar, literalmente.`);
    showNotification(`Excavaste y encontraste: ${parceCard(drawnCard[0])}`);
    gameState.turnState = 'paused';
    renderGameState(gameState);
}