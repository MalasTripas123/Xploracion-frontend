import { showNotification } from '../ui/notif.js';
import { gameState } from '../state.js';
import { renderGameState } from '../ui.js';
import { restore } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function buy() {
    const discard = gameState.discard;
    // retorna si el descarte está vacío
    if (discard.length < 1) return showNotification("¡La tienda está vacía!");
    
    const currentPlayer = gameState.players[gameState.turn];
    // retorna si el jugador no tiene para pagar la carta
    if (currentPlayer.coins < gameState.discard[gameState.discard.length-1].price) return showNotification("Monedas insuficientes!");
    
    // descuenta las monedas
    currentPlayer.coins -= gameState.discard[gameState.discard.length-1].price;
    // realiza la compra
    const buyedCard = restore(1, currentPlayer);

    showNotification("La basura de unos es el tesoro de otros.");
    showNotification(`Compraste: ${parceCard(buyedCard[0])}`);
    gameState.turnState = 'paused';
    renderGameState(gameState);
}