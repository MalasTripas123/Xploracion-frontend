import { elements, gameState } from './state.js';
import { updatePlayers } from './ui/player.js';
import { updateBoard } from './ui/board.js';
import { updateHand } from './ui/hand.js';

export function renderGameState(state) {
    gameState.turnState = 'initial'; //! PARA QUE NUNCA SE PAUSE
    gameState.players[gameState.turn].coins = gameState.players[gameState.turn].coins < 1 ? 10 : gameState.players[gameState.turn].coins; //! PARA NO QUEDARSE SIN MONEDAS
    elements.currentRound.textContent = state.currentRound;
    updatePlayers(state);
    updateBoard(state);
    updateHand(state.players[state.turn].hand);
    toggleButtons();
}

function toggleButtons() {
    const state = gameState.turnState;
    const selectedCard = 'carta seleccionada';
    const precioDescarte = gameState.discard[gameState.discard.length-1].price;
    elements.actionButtons.innerHTML = `
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="explore">Explorar <div class="action-value">1</div></button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="trick">Embaucar <div class="action-value">1</div></button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="buy">Comprar Descarte <div class="action-value">${precioDescarte}</div></button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn'}" data-action="sell">Vender ${selectedCard}</button>
        <button class="${state === 'paused' || state === 'explored' ? 'blocked-btn' : 'action-btn'}" data-action="dig">Excavar <div class="action-value">2</div></button>
        <button class="${state === 'paused' ? 'blocked-btn' : 'action-btn primary'}" data-action="pass">Pasar Turno</button>
    `;
}