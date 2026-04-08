import { showNotification } from './ui/notif.js';
import { gameState, renderGameState } from './state.js';
import { initGame } from './game-logic/init.js';
import { initActionEvents } from './game-logic/actions.js';
import { updateHand } from './ui/hand.js';
import { mill } from './game-logic/basic-actions.js';

window.addEventListener('DOMContentLoaded', () => {
    initGame();
    renderGameState(gameState);
    initActionEvents();
    setTimeout(() => showNotification("¡La partida comienza! Eres Barbanegra."), 500);
    millALot();
});

// Evento crítico para recalcular los márgenes de las cartas si el usuario redimensiona la ventana
window.addEventListener('resize', () => {
    updateHand(gameState.players.find(p => p.id === gameState.currentPlayerId).hand);
});

// funciones de debug
function millALot(howMany = 10){
    mill(howMany);
    renderGameState(gameState);
}