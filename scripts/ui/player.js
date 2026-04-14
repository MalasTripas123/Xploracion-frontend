import { elements } from '../state.js';

export function updatePlayers(state) {
    elements.playersContainer.innerHTML = ''; 
    state.players.forEach(player => {
        const isActive = state.players[state.turn].id === player.id;
        const isMe = player.id === state.myPlayerId;
        const playerDiv = document.createElement('div');
        playerDiv.className = `player-card ${isActive ? 'active' : ''}`;

        playerDiv.innerHTML = `
            <div class="player-name">${player.name} ${isMe ? '(Tú)' : ''}</div>
            <div class="player-stats">
                <span>🃏 ${player.hand.length}</span>
                <span>🟡 ${player.coins}</span>
            </div>
        `;
        elements.playersContainer.appendChild(playerDiv);
    });
}