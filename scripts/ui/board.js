import { elements } from '../state.js';

export function updateBoard(state) {
    elements.deckCount.textContent = state.deckRemaining;
    const me = state.players.find(p => p.id === state.myPlayerId);
    if (me) elements.myCoins.textContent = me.coins;

    if (state.discardTopCard) {
        elements.discardElement.classList.remove('empty');
        elements.discardContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #725C42; text-transform: uppercase; margin-bottom: 5px; font-weight: bold;">
                ${state.discardTopCard.type}
            </div>
            <div style="font-weight: bold; color: var(--card-text);">
                ${state.discardTopCard.name}
            </div>
            <div style="margin-top: 10px; background: var(--gold); color: var(--bg-wood-dark); border: 2px solid var(--bg-wood-dark); border-radius: 50%; width: 28px; height: 28px; display: inline-flex; justify-content: center; align-items: center; font-size: 0.9rem; font-weight: bold;">
                ${state.discardTopCard.value}
            </div>
        `;
    } else {
        elements.discardElement.classList.add('empty');
        elements.discardContent.textContent = "Vacío";
    }
}