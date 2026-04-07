import { buildDeck, shuffle } from "./deck.js";
import { gameState, elements } from '../state.js'
import { moveCards } from './basic-actions.js'

// acá se inicia el juego
export function initGame() {
    buildDeck();
    initialSetup();
}

function initialSetup() {
    let currentDeck = gameState.deck.currentDeck;
    gameState.deck.basicDeck.map(card => { currentDeck.push(structuredClone(card)); });
    gameState.players.forEach(player => {
        moveCards(currentDeck, player.hand, 7);
    });
    gameState.deck.specialDeck.map(card => { currentDeck.push(structuredClone(card)); });
    shuffle(currentDeck);
}