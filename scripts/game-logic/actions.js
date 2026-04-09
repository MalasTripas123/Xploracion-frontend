import { showNotification } from '../ui/notif.js';
import { elements, gameState, selectedCards } from '../state.js';
import { renderGameState } from '../ui.js';
import { explore } from './explore.js';
import { buy } from './buy.js';
import { dig } from './dig.js';


export function initActionEvents() {
    elements.actionButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            handleAction(e.target.dataset.action);
        }
    });
}

function handleAction(action) {
    if (gameState.players[gameState.turn].id !== gameState.myPlayerId) {
        return showNotification("¡No es tu turno, grumete!");
    }

    const actionsMap = {
        'explore': () => {
            if (gameState.turnState === 'paused') return;
            explore();
        },
        'trick': () => {
            if (gameState.turnState === 'paused') return;

            if (selectedCards.size === 0) return showNotification("¡Selecciona una carta para Embaucar!");
            showNotification(`Acción: Embaucar jugado con ${selectedCards.size} cartas.`);
        },
        'buy': () => {
            if (gameState.turnState === 'paused') return;
            buy();
        },
        'sell': () => {
            if (gameState.turnState === 'paused') return;

            if (selectedCards.size === 0) return showNotification("¡Selecciona botín para vender!");
            showNotification(`Acción: Vendiste ${selectedCards.size} cartas por doblones.`);
            gameState.myHand = gameState.myHand.filter(c => !selectedCards.has(c.id));
            renderGameState(gameState);
        },
        'dig': () => {
            if (gameState.turnState === 'paused' || gameState.turnState === 'explored') return;
            dig();
        },
        'pass': () => {
            if (gameState.turnState === 'paused') return;

            showNotification("Acción: Pasas el turno.");
            gameState.currentPlayerId = "p2";
            renderGameState(gameState);
        }
    };

    if (actionsMap[action]) actionsMap[action]();
    //if (gameState.turnState === 'paused') finishTurn();
}