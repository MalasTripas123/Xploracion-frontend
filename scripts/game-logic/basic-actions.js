import { gameState } from '../state.js';

// robar [baraja => mano]
export function draw(ammount, player) {
    return moveCards(gameState.deck.currentDeck, player.hand, ammount);
}
// moler [baraja => descarte]
export function mill(ammount) {
    return moveCards(gameState.deck.currentDeck, gameState.discard, ammount);
}
// barajar [mano => baraja]
// descartar [mano => descarte]
// reintegrar [descarte => baraja]
// devolver [descarte => mano]
export function getback(ammount, player) {
    return moveCards(gameState.discard, player.hand, ammount);
}

// desvanecer [baraja => void]
// destruir [mano => void]
// exiliar [descarte = void]

// mover X cartas de origin a destiny
export function moveCards(origin, destiny, ammount) {
    const movedCards = origin.splice(0, ammount).map(card => structuredClone(card));
    destiny.push(...movedCards);
    return movedCards;
}