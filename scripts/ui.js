import { elements, gameState, selectedCards } from './state.js';
import { updatePlayers } from './ui/player.js';
import { updateBoard } from './ui/board.js';
import { updateHand } from './ui/hand.js';

export function renderGameState(state) {
    //gameState.turnState = 'initial'; //! PARA QUE NUNCA SE PAUSE
    //gameState.players[gameState.turn].coins = gameState.players[gameState.turn].coins < 1 ? 10 : gameState.players[gameState.turn].coins; //! PARA NO QUEDARSE SIN MONEDAS
    elements.currentRound.textContent = state.currentRound;
    elements.currentTurn.textContent = state.totalTurns;
    elements.currentPlayer.textContent = state.players[state.turn].name + ` (P${state.turn+1})`;
    updatePlayers(state);
    updateBoard(state);
    updateHand(state.players[state.turn].hand);
    toggleButtons();
}

export function toggleButtons() {
    const state = gameState.turnState;

    const emptyDiscard = gameState.discard.length > 0 ? false : true;
    const precioDescarte = emptyDiscard ? '' : gameState.discard[gameState.discard.length-1].price;

    let sellActive = false;
    let selectedCard = '';
    let textInSellButton = ''
    let oneClueSelected = false;
    let thiefSelected = false;
    if (selectedCards.size === 1) {
        if (Array.from(selectedCards)[0].type !== 'PISTA') {
            if (Array.from(selectedCards)[0].type === 'BANDIDO') {
                thiefSelected = true;
            } else { 
                sellActive = true;
                selectedCard = Array.from(selectedCards)[0];
            }
        } else {
            oneClueSelected = true;
        }
    } else if (selectedCards.size === 2) {
        sellActive = true;
        selectedCard = {
            name: '2 pistas',
            price: 1,
        }
    }

    textInSellButton = sellActive ?
        'Vender: ' + selectedCard.name + `<span class="action-value">${selectedCard.price}</span>` :
        oneClueSelected ?
            'Elige otra pista para vender 2' :
            thiefSelected ?
                'No se puede vender un bandido' :
                'Selecciona un botín';

    elements.actionButtons.innerHTML = `
        <button class="${state === 'paused' || state === 'stoped' ? 'blocked-btn' : 'action-btn'}" data-action="explore">Explorar <span class="action-value">1</span></button>
        <button class="${state === 'paused' || state === 'stoped' ? 'blocked-btn' : 'action-btn'}" data-action="trick">Embaucar <span class="action-value">1</span></button>
        <button class="${state === 'paused' || state === 'stoped' ? 'blocked-btn' : emptyDiscard ? 'blocked-btn' : 'action-btn'}" data-action="buy">${emptyDiscard ? 'Tienda vacía' : `Comprar <span class="action-value">${precioDescarte}</span>`}</button>
        <button class="${state === 'paused' || state === 'stoped' ? 'blocked-btn' : sellActive ? 'action-btn' : 'blocked-btn'}" data-action="sell">${textInSellButton}</button>
        <button class="${state === 'paused' || state === 'explored' || state === 'stoped' ? 'blocked-btn' : 'action-btn'}" data-action="dig">Excavar <span class="action-value">2</span></button>
        <button class="${state === 'stoped' ? 'blocked-btn' : 'action-btn primary'}" data-action="pass">Pasar Turno</button>
    `;
}