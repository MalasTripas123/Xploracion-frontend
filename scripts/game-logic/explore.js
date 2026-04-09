import { showNotification } from '../ui/notif.js';
import { gameState } from '../state.js';
import { renderGameState } from '../ui.js';
import { draw } from './basic-actions.js';
import { parceCard } from './parce-card.js';

export function explore() {
    const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
    // retorna si el jugador no tiene dinero
    if (currentPlayer.coins < 1) return showNotification("Monedas insuficientes!");

    const drawnCard = draw(1, currentPlayer);
    currentPlayer.coins -= 1;

    if (drawnCard[0].type === 'TROZO01' || drawnCard[0].type === 'TROZO02' || drawnCard[0].type === 'TROZO03' || drawnCard[0].type === 'BANDIDO') {
        console.log(`Se devuelve ${parceCard(drawnCard[0])}`);
        gameState.discard.push(drawnCard[0]);
        gameState.players[gameState.turn].hand.splice(gameState.players[gameState.turn].hand.length-1, 1);
    }
    if (drawnCard[0].type === 'BANDIDO') {
        //TODO si encuentras un bandido ocurre un asalto
    }

    showNotification(`Exploraste y encontraste: ${parceCard(drawnCard[0])}`);
    gameState.turnState = 'explored';
    renderGameState(gameState);
}