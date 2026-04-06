import { showNotification } from '../ui/notif.js';
import { elements, gameState, selectedCards, renderGameState } from '../state.js';

export function initActionEvents() {
    elements.actionButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            handleAction(e.target.dataset.action);
        }
    });
}

function handleAction(action) {
    if (gameState.currentPlayerId !== gameState.myPlayerId) {
        return showNotification("¡No es tu turno, grumete!");
    }

    const actionsMap = {
        'explore': () => {
            showNotification("Acción: Explorando el océano...");
            gameState.deckRemaining -= 1;
            gameState.myHand.push({ id: `c${Date.now()}`, name: "Cofre Misterioso", type: "desconocido", value: 0 });
            renderGameState(gameState);
        },
        'trick': () => {
            if (selectedCards.size === 0) return showNotification("¡Selecciona una carta para Embaucar!");
            showNotification(`Acción: Embaucar jugado con ${selectedCards.size} cartas.`);
        },
        'buy': () => {
            if (!gameState.discardTopCard) return showNotification("¡El descarte está vacío!");
            showNotification("Acción: Compraste botín del descarte.");
            gameState.myHand.push(gameState.discardTopCard);
            gameState.discardTopCard = null;
            renderGameState(gameState);
        },
        'sell': () => {
            if (selectedCards.size === 0) return showNotification("¡Selecciona botín para vender!");
            showNotification(`Acción: Vendiste ${selectedCards.size} cartas por doblones.`);
            gameState.myHand = gameState.myHand.filter(c => !selectedCards.has(c.id));
            renderGameState(gameState);
        },
        'dig': () => {
            showNotification("Acción: Excavar ejecutada. ¡Busca el tesoro!");
        },
        'pass': () => {
            showNotification("Acción: Pasas el turno.");
            gameState.currentPlayerId = "p2";
            renderGameState(gameState);
        }
    };

    if (actionsMap[action]) actionsMap[action]();
}