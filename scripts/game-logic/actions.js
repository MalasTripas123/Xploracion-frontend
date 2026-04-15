import { elements, gameState } from '../state.js';
import { explore } from './explore.js';
import { buy } from './buy.js';
import { dig } from './dig.js';
import { sell } from './sell.js';
import { passTurn, autoPassTurn } from './turn.js';
import { trick } from './trick.js';
import { hasWon } from './win-lose-condition.js';


export function initActionEvents() {
    elements.actionButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            handleAction(e.target.dataset.action);
        }
    });
}

function handleAction(action) {
    const actionsMap = {
        'explore': () => {
            if (['paused', 'stoped'].includes(gameState.turnState)) return;
            explore();
            hasWon(gameState.players[gameState.turn]);
        },
        'trick': () => {
            if (['paused', 'stoped'].includes(gameState.turnState)) return;
            trick();
        },
        'buy': () => {
            if (['paused', 'stoped'].includes(gameState.turnState)) return;
            buy();
            hasWon(gameState.players[gameState.turn]);
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'sell': () => {
            if (['paused', 'stoped'].includes(gameState.turnState)) return;
            sell();
            hasWon(gameState.players[gameState.turn]);
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'dig': () => {
            if (['paused', 'stoped'].includes(gameState.turnState)) return;
            dig();
            hasWon(gameState.players[gameState.turn]);
            if (gameState.turnState === 'paused') autoPassTurn(10);
        },
        'pass': () => {
            if (['stoped'].includes(gameState.turnState)) return;
            passTurn();
        }
    };

    if (actionsMap[action]) actionsMap[action]();
}