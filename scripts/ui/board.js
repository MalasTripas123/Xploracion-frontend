import { elements } from '../state.js';

export function updateBoard(state) {
    elements.deckCount.textContent = state.deck.currentDeck.length;
    elements.discardCount.textContent = state.discard.length;
    const me = state.players.find(p => p.id === state.myPlayerId);
    if (me) elements.myCoins.textContent = me.coins;

    if (state.discard.length > 0) {
        elements.discardElement.classList.remove('empty');
        elements.discardContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #725C42; text-transform: uppercase; margin-bottom: 5px; font-weight: bold;">
                ${state.discard[state.discard.length-1].type}
            </div>
            <div style="font-weight: bold; color: var(--card-text);">
                ${state.discard[state.discard.length-1].name}
            </div>
            <div style="margin-top: 10px; background: var(--gold); color: var(--bg-wood-dark); border: 2px solid var(--bg-wood-dark); border-radius: 50%; width: 28px; height: 28px; display: inline-flex; justify-content: center; align-items: center; font-size: 0.9rem; font-weight: bold;">
                ${state.discard[state.discard.length-1].price}
            </div>
            <div style="position: absolute; bottom: 10px; left: 10px; margin-top: 10px; font-size: 0.6rem; font-weight: bold;">
                ID: ${state.discard[state.discard.length-1].id}
            </div>
        `;
    } else {
        elements.discardElement.classList.add('empty');
        elements.discardContent.textContent = "Vacío";
    }
}