import { showNotification } from '../ui/notif.js';
import { elements, gameState, selectedCards } from '../state.js';
import { renderGameState } from '../ui.js';
import { explore } from './explore.js';
import { buy } from './buy.js';
import { dig } from './dig.js';
import { sell } from './sell.js';
import { passTurn, autoPassTurn } from './turn.js';
import { trick } from './trick.js';


export function initActionEvents() {
    elements.actionButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            handleAction(e.target.dataset.action);
        }
    });
}

function handleAction(action) {
    // if (gameState.players[gameState.turn].id !== gameState.myPlayerId) {
    //     return showNotification("¡No es tu turno, grumete!");
    // }

    const actionsMap = {
        'explore': () => {
            if (gameState.turnState === 'paused') return;
            explore();
        },
        'trick': () => {
            if (gameState.turnState === 'paused') return;
            trick();
            // if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'buy': () => {
            if (gameState.turnState === 'paused') return;
            buy();
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'sell': () => {
            if (gameState.turnState === 'paused') return;
            sell();
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'dig': () => {
            if (gameState.turnState === 'paused' || gameState.turnState === 'explored') return;
            dig();
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'pass': () => {
            passTurn();
        }
    };

    if (actionsMap[action]) actionsMap[action]();
    //if (gameState.turnState === 'paused') finishTurn();
}