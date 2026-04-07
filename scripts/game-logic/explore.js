import { showNotification } from '../ui/notif.js';
import { gameState, renderGameState } from '../state.js';
import { draw } from './basic-actions.js';

export function explore() {
    const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
    // retorna si el jugador no tiene dinero
    if (currentPlayer.coins < 1) {
        showNotification("Monedas insuficientes!");
        return;
    }
    const drawnCard = draw(1, currentPlayer);
    currentPlayer.coins -= 1;
    showNotification(`Exploraste y encontraste: ${drawnCard[0].name} ${drawnCard[0].pieces != null && drawnCard[0].pieces.length ? '(' + drawnCard[0].pieces.map(p => '[' + p + ']').join('') + ')' : ''}`);
    renderGameState(gameState);
}