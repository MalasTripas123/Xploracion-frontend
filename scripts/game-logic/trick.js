import { gameState, selectedCards, elements } from "../state.js";
import { renderGameState } from "../ui.js";
import { showNotification } from "../ui/notif.js";
import { parceCard } from "./parce-card.js";
import { autoPassTurn } from "./turn.js";

export function trick(player=null) {
    if (player == null) return openPlayerSelector();

    gameState.players[gameState.turn].coins -= 1;
    // le roba una carta al azar de la mano a otro jugador
    const stolenCard = player.hand[Math.floor(Math.random() * player.hand.length)];
    gameState.players[gameState.turn].hand.push(stolenCard);
    player.hand = player.hand.filter(c => c.id != stolenCard.id);

    elements.trickPlayerSelectorContainer.innerHTML = '';
    elements.trickPlayerSelectorContainer.className = 'trick-player-selector';
    showNotification(`Si los tontos volaran no veríamos el sol.`);
    showNotification(`Embaucaste a ${player.name} y le robaste: ${parceCard(stolenCard)}`);
    gameState.turnState = 'paused';
    renderGameState(gameState);
    if (gameState.turnState === 'paused') autoPassTurn(10);
}

function openPlayerSelector() {
    elements.trickPlayerSelectorContainer.innerHTML = '';
    elements.trickPlayerSelectorContainer.className = 'trick-player-selector active';

    gameState.players.forEach(player => {
        if (player !== gameState.players[gameState.turn] && player.hand.length > 0) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-to-trick';
            playerDiv.innerHTML = `
                <div class="player-name">${player.name}</div>
                <div class="player-stats">
                    <span>🃏 ${player.hand.length}</span>
                    <span>🟡 ${player.coins}</span>
                </div>
            `;
            playerDiv.addEventListener('click', () => {
                trick(player);
            });
            elements.trickPlayerSelectorContainer.appendChild(playerDiv);
        }
    });
    
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML += `
        <div class="trick-player-selector-close">Volver</div>
    `;
    closeBtn.addEventListener('click', () => {
        elements.trickPlayerSelectorContainer.innerHTML = '';
        elements.trickPlayerSelectorContainer.className = 'trick-player-selector';
    });
    elements.trickPlayerSelectorContainer.appendChild(closeBtn);
}