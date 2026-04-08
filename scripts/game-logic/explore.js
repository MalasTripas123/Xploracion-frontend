import { showNotification } from '../ui/notif.js';
import { gameState, renderGameState } from '../state.js';
import { draw } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function explore() {
    const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
    // retorna si el jugador no tiene dinero
    if (currentPlayer.coins < 1) return showNotification("Monedas insuficientes!");

    const drawnCard = draw(1, currentPlayer);
    currentPlayer.coins -= 1;

    //TODO si encuentras un bandido ocurre un asalto

    showNotification(`Exploraste y encontraste: ${parceCard(drawnCard[0])}`);
    renderGameState(gameState);
}