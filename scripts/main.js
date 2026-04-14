import { showNotification } from './ui/notif.js';
import { gameState } from './state.js';
import { renderGameState } from './ui.js';
import { initGame } from './game-logic/init.js';
import { initActionEvents } from './game-logic/actions.js';
import { updateHand } from './ui/hand.js';
import { mill } from './game-logic/basic-actions.js';

window.addEventListener('DOMContentLoaded', () => {
    initGame();
    // millALot(); //! borrar después
    // addFullMapToHand(); //! borrar después
    addBanditsToTop(); //! borrar después
    renderGameState(gameState);
    initActionEvents();
    setTimeout(() => showNotification("¡La partida comienza! Eres Barbanegra."), 500);
});

// Evento crítico para recalcular los márgenes de las cartas si el usuario redimensiona la ventana
window.addEventListener('resize', () => {
    updateHand(gameState.players[gameState.turn].hand);
});

//! funciones de debug
function millALot(howMany = 10){
    mill(howMany);
}
function addFullMapToHand() {
    gameState.players[gameState.turn].hand.push({
        id: 999,
        type: "MAPA",
        price: 8,
        pieces: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        name: "MAPA DEL TESORO",
        symbol: "X",
        sprite: ''
    });
}
function addBanditsToTop() {
    gameState.deck.currentDeck.unshift({id: 1000, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO MEDIA MANO", symbol: "B", sprite: ''});
    // gameState.deck.currentDeck.unshift({id: 1001, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO SELECTIVO", symbol: "B", sprite: ''});
    // gameState.deck.currentDeck.unshift({id: 1002, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO CODICIOSO", symbol: "B", sprite: ''});
}