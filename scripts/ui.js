import { elements, gameState } from './state.js';
import { updatePlayers } from './ui/player.js';
import { updateBoard } from './ui/board.js';
import { updateHand } from './ui/hand.js';

export function renderGameState(state) {
    elements.currentRound.textContent = state.currentRound;
    updatePlayers(state);
    updateBoard(state);
    updateHand(state.players.find(p => p.id === state.currentPlayerId).hand);
    toggleButtons();
}

function toggleButtons() {
    const state = gameState.turnState;
    elements.actionButtons.innerHTML = `
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="explore">Explorar</button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="trick">Embaucar</button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="buy">Comprar Descarte</button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="sell">Vender Botín</button>
        <button class="${state === 'paused' || state === 'explored' ? 'blocked-btn' : 'action-btn'}" data-action="dig">Excavar</button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn primary'}" data-action="pass">Pasar Turno</button>
    `;
}