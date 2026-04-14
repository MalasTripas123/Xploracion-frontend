import { gameState, selectedCards, elements } from "../state.js";
import { renderGameState } from "../ui.js";
import { showNotification, trickedNotification } from "../ui/notif.js";
import { assaultAsCounter } from "./assault.js";
import { parceCard } from "./parce-card.js";
import { autoPassTurn } from "./turn.js";

export function trick(trickedPlayer=null) {
    if (trickedPlayer == null) return openPlayerSelector();

    gameState.players[gameState.turn].coins -= 1;
    // elige una carta al azar de la mano a otro jugador
    const pickedCard = trickedPlayer.hand[Math.floor(Math.random() * trickedPlayer.hand.length)];
    // momento para usar el counter
    const availableBandits = canCounterTrick(trickedPlayer); // pregunta si hay bandidos para hacer counter
    if (availableBandits) { // si hay bandidos disponibles
        const currentPlayerTurn = gameState.turn;
        const trickedPlayerTurn = gameState.players.findIndex(player => player.id === trickedPlayer.id);
        // cambia el turno actual por el del jugador embaucado para poder renderizar su pov
        gameState.turn = trickedPlayerTurn;
        renderGameState(gameState);
        // oculta el selector de jugadores del trick
        elements.trickPlayerSelectorContainer.innerHTML = '';
        elements.trickPlayerSelectorContainer.className = 'trick-player-selector';
        // llama a la notificación que cambia el pov y muestra al jugador embaucado la carta que está periendo y si quiere responder
        trickedNotification(trickedPlayerTurn, availableBandits, currentPlayerTurn, pickedCard);
    } else { // si no hay bandidos disponibles se roba la carta elegida
        stealCard(trickedPlayer, pickedCard);
    }
}

export function counterResponseAction(counterResponse, banditCard, currentPlayerTurn, trickedPlayerTurn, pickedCard) {
    if (counterResponse === 'trick') {
        // sí tenía counter pero no hizo nada
        console.log('eaeqwe');
        stealCard(gameState.players[trickedPlayerTurn], pickedCard);
    }
    if (counterResponse === 'assault') {
        // sí respondió
        assaultAsCounter(banditCard, currentPlayerTurn, trickedPlayerTurn);
        gameState.turnState = 'paused';
        renderGameState(gameState);
        if (gameState.turnState === 'paused') autoPassTurn(10);
    }
}

function stealCard(trickedPlayer, stolenCard) {
    gameState.players[gameState.turn].hand.push(stolenCard);
        trickedPlayer.hand = trickedPlayer.hand.filter(c => c.id != stolenCard.id);

        elements.trickPlayerSelectorContainer.innerHTML = '';
        elements.trickPlayerSelectorContainer.className = 'trick-player-selector';
        showNotification(`Si los tontos volaran no veríamos el sol.`);
        showNotification(`Embaucaste a ${trickedPlayer.name} y le robaste: ${parceCard(stolenCard)}`);
        gameState.turnState = 'paused';
        renderGameState(gameState);
        if (gameState.turnState === 'paused') autoPassTurn(10);
}

function canCounterTrick(trickedPlayer) {
    // averiguar si hay cartas de bandido
    const availableBandits = trickedPlayer.hand.filter(card => card.type === 'BANDIDO');
    if (availableBandits.length === 0) return null;
    // si hay, devolver la info necesaria
    return availableBandits;
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