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
    addRandomBanditToTop(); //! borrar después
    addRandomBanditToHand(gameState.players[1]); //! borrar después
    addRandomBanditToHand(gameState.players[1]); //! borrar después
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
function addRandomBanditToTop() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) gameState.deck.currentDeck.unshift({id: 1000, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO MEDIA MANO", symbol: "B", sprite: ''});
    if (randomNumber === 2) gameState.deck.currentDeck.unshift({id: 1001, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO SELECTIVO", symbol: "B", sprite: ''});
    if (randomNumber === 3) gameState.deck.currentDeck.unshift({id: 1002, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO CODICIOSO", symbol: "B", sprite: ''});
}
function addRandomBanditToHand(player) {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) player.hand.push({id: 1000, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO MEDIA MANO", symbol: "B", sprite: ''});
    if (randomNumber === 2) player.hand.push({id: 1001, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO SELECTIVO", symbol: "B", sprite: ''});
    if (randomNumber === 3) player.hand.push({id: 1002, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO CODICIOSO", symbol: "B", sprite: ''});
}