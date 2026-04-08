import { showNotification } from '../ui/notif.js';
import { gameState, renderGameState } from '../state.js';
import { getback } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function buy() {
    const discard = gameState.discard;
    // retorna si el descarte está vacío
    if (discard.length < 1) return showNotification("¡El descarte está vacío!");
    
    const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
    // retorna si el jugador no tiene para pagar la carta
    if (currentPlayer.coins < gameState.discard[gameState.discard.length-1].price) return showNotification("Monedas insuficientes!");

    const buyedCard = getback(1, currentPlayer);
    currentPlayer.coins -= gameState.discard[gameState.discard.length-1].price;

    showNotification("La basura de unos es el tesoro de otros.");
    showNotification(`Compraste del descarte: ${parceCard(buyedCard[0])}`);
    renderGameState(gameState);
}