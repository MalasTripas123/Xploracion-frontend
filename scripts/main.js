import { showNotification } from './ui/notif.js';
import { gameState, renderGameState } from './state.js';
import { initGame } from './game-logic/init.js';
import { initActionEvents } from './game-logic/actions.js';

initActionEvents();

window.addEventListener('DOMContentLoaded', () => {
    renderGameState(gameState);
    initGame();
    setTimeout(() => showNotification("¡La partida comienza! Eres Barbanegra."), 500);
});

// Evento crítico para recalcular los márgenes de las cartas si el usuario redimensiona la ventana
window.addEventListener('resize', () => {
    updateHand(gameState.myHand);
});