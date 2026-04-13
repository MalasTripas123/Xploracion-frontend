import { gameState } from '../state.js';

// REGLAS GENERALES:
// Al sacar cartas de la baraja, se sacan del PRINCIPIO
// Al sacar cartas del descarte, se sacan del FINAL
// Al sacar cartas de la mano, se deben ELEGIR

// robar [baraja => mano]
export function draw(ammount, player) {
    return moveCards(gameState.deck.currentDeck, player.hand, ammount);
}

// moler [baraja => descarte]
export function mill(ammount) {
    return moveCards(gameState.deck.currentDeck, gameState.discard, ammount);
}

// colocar [mano => baraja] //! desde la mano debería elegirse qué carta sacar
export function place() {
    //TODO
}

// descartar [mano => descarte] //! desde la mano debería elegirse qué carta sacar
export function discard(ammount, player, cards) {
    //TODO descartar una carta a elección
    return moveCards(player.hand, gameState.discard, ammount, true); // con esto descarta la ÚLTIMA carta puesta en la mano
}

// reciclar [descarte => baraja]
export function recycle() {
    //TODO
}

// restaurar [descarte => mano]
export function restore(ammount, player) {
    return moveCards(gameState.discard, player.hand, ammount, true);
}

// desvanecer [baraja => void]
// destruir [mano => void]
// exiliar [descarte = void]

// mover X cartas de origin a destiny
export function moveCards(origin, destiny, ammount, takeFromEnd=false) {
    const movedCards = origin.splice(takeFromEnd? origin.length-ammount : 0, ammount).map(card => structuredClone(card));
    destiny.push(...movedCards);
    return movedCards;
}