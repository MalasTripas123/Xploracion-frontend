import { gameState } from '../state.js';

// robar [baraja => mano]
export function draw(ammount, player) {
    return moveCards(gameState.deck.currentDeck, player.hand, ammount);
}
// moler [baraja => descarte]
// barajar [mano => baraja]
// descartar [mano => descarte]
// reintegrar [descarte => baraja]
// devolver [descarte => mano]

// desvanecer [baraja => void]
// destruir [mano => void]
// exiliar [descarte = void]

// mover cartas
export function moveCards(origin, destiny, ammount) {
    const movedCards = origin.splice(0, ammount).map(card => structuredClone(card));
    destiny.push(...movedCards);
    return movedCards;
}