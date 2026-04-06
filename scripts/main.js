/**
 * 1. ESTADO FALSO DEL JUEGO (Con 12 cartas para demostrar la compresión)
 */
let gameState = {
    currentRound: 3,
    currentPlayerId: "p1",
    myPlayerId: "p1", 
    deckRemaining: 34,
    discardTopCard: { id: "c100", name: "Cáliz Antiguo", type: "artefacto", value: 15 },
    players: [
        { id: "p1", name: "Barbanegra", cardCount: 12, coins: 10 },
        { id: "p2", name: "Anne Bonny", cardCount: 4, coins: 5 },
        { id: "p3", name: "Jack Rackham", cardCount: 6, coins: 12 }
    ],
    // ¡Mano con muchas cartas para forzar la matemática de superposición!
    myHand: [
        { id: "c1", name: "Sable Oxidado", type: "arma", value: 2 },
        { id: "c2", name: "Ron Añejo", type: "objeto", value: 5 },
        { id: "c3", name: "Doblón de Plata", type: "tesoro", value: 10 },
        { id: "c4", name: "Mapa Rasgado", type: "artefacto", value: 8 },
        { id: "c5", name: "Bota Vieja", type: "basura", value: 1 },
        { id: "c6", name: "Brújula Rota", type: "artefacto", value: 3 },
        { id: "c7", name: "Pistola de Chispa", type: "arma", value: 7 },
        { id: "c8", name: "Catalejo", type: "objeto", value: 4 },
        { id: "c9", name: "Perla Negra", type: "tesoro", value: 20 },
        { id: "c10", name: "Daga Larga", type: "arma", value: 4 },
        { id: "c11", name: "Cuerdas", type: "objeto", value: 1 },
        { id: "c12", name: "Garfio", type: "arma", value: 5 }
    ]
};

let selectedCards = new Set();

const els = {
    currentRound: document.getElementById('current-round-display'),
    myCardCount: document.getElementById('my-card-count'),
    currentTurn: document.getElementById('current-turn-display'),
    playersContainer: document.getElementById('players-container'),
    deckCount: document.getElementById('deck-count'),
    discardElement: document.getElementById('discard-element'),
    discardContent: document.getElementById('discard-content'),
    myCoins: document.getElementById('my-coins'),
    handContainer: document.getElementById('hand-container'),
    notifications: document.getElementById('notifications-container'),
    actionButtons: document.getElementById('action-buttons')
};

function renderGameState(state) {
    els.currentRound.textContent = state.currentRound;
    updatePlayers(state);
    updateBoard(state);
    updateHand(state.myHand);
}

function updatePlayers(state) {
    els.playersContainer.innerHTML = ''; 
    state.players.forEach(player => {
        const isActive = player.id === state.currentPlayerId;
        const isMe = player.id === state.myPlayerId;
        const playerDiv = document.createElement('div');
        playerDiv.className = `player-card ${isActive ? 'active' : ''}`;
        
        if (isActive) els.currentTurn.textContent = isMe ? "Tu Turno" : player.name;

        playerDiv.innerHTML = `
            <div class="player-name">${player.name} ${isMe ? '(Tú)' : ''}</div>
            <div class="player-stats">
                <span>🃏 ${player.cardCount}</span>
                <span>🟡 ${player.coins}</span>
            </div>
        `;
        els.playersContainer.appendChild(playerDiv);
    });
}

function updateBoard(state) {
    els.deckCount.textContent = state.deckRemaining;
    const me = state.players.find(p => p.id === state.myPlayerId);
    if (me) els.myCoins.textContent = me.coins;

    if (state.discardTopCard) {
        els.discardElement.classList.remove('empty');
        els.discardContent.innerHTML = `
            <div style="font-size: 0.8rem; color: #725C42; text-transform: uppercase; margin-bottom: 5px; font-weight: bold;">
                ${state.discardTopCard.type}
            </div>
            <div style="font-weight: bold; color: var(--card-text);">
                ${state.discardTopCard.name}
            </div>
            <div style="margin-top: 10px; background: var(--gold); color: var(--bg-wood-dark); border: 2px solid var(--bg-wood-dark); border-radius: 50%; width: 28px; height: 28px; display: inline-flex; justify-content: center; align-items: center; font-size: 0.9rem; font-weight: bold;">
                ${state.discardTopCard.value}
            </div>
        `;
    } else {
        els.discardElement.classList.add('empty');
        els.discardContent.textContent = "Vacío";
    }
}

function updateHand(cards) {
    els.handContainer.innerHTML = ''; 
    els.myCardCount.innerHTML = `Cartas en mano: <strong class="highlight">${cards.length}</strong>`;
    
    const previousSelection = new Set(selectedCards);
    selectedCards.clear();

    // Solución 1: Calcular la superposición (overlap) dinámicamente según el espacio real.
    // Ancho del contenedor (quitamos 40px por el padding lateral de la UI)
    const containerWidth = els.handContainer.clientWidth || window.innerWidth - 40; 
    const cardWidth = 130;
    let dynamicMargin = -30; // Margen base negativo si hay pocas cartas

    if (cards.length > 1) {
        // Si pusiéramos todas las cartas con el margen base, ¿cuánto ocuparían?
        const estimatedWidth = cardWidth + (cards.length - 1) * (cardWidth + dynamicMargin);
        
        // Si superan el tamaño de la pantalla/contenedor, calculamos cuánto deben comprimirse
        if (estimatedWidth > containerWidth) {
            // Fórmula: (Ancho Disponible - Ancho de la primera carta) / Espacios entre cartas - Ancho de la carta
            dynamicMargin = ((containerWidth - cardWidth) / (cards.length - 1)) - cardWidth;
            
            // Aseguramos que nunca se oculten por completo (dejamos al menos 25px visibles)
            dynamicMargin = Math.max(dynamicMargin, -105);
        }
    }

    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = card.id;
        
        // Z-index estrictamente en orden ascendente (derecha cubre a izquierda)
        cardEl.style.zIndex = index;

        // Aplicamos el margen dinámico calculado a todas las cartas menos a la primera
        if (index > 0) {
            cardEl.style.marginLeft = `${dynamicMargin}px`;
        }

        if (previousSelection.has(card.id)) {
            cardEl.classList.add('selected');
            selectedCards.add(card.id);
        }

        cardEl.innerHTML = `
            <div class="card-title">${card.name}</div>
            <div class="card-type">${card.type}</div>
            <div class="card-value">${card.value}</div>
        `;

        cardEl.addEventListener('click', () => handleCardClick(card.id, cardEl));
        els.handContainer.appendChild(cardEl);
    });
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    els.notifications.appendChild(notif);
    setTimeout(() => {
        if (notif.parentNode) notif.parentNode.removeChild(notif);
    }, 3000);
}

function handleCardClick(cardId, element) {
    if (selectedCards.has(cardId)) {
        selectedCards.delete(cardId);
        element.classList.remove('selected');
    } else {
        selectedCards.add(cardId);
        element.classList.add('selected');
    }
}

els.actionButtons.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        handleAction(e.target.dataset.action);
    }
});

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

/**
 * 6. INICIALIZACIÓN Y EVENTOS DE VENTANA
 */
window.addEventListener('DOMContentLoaded', () => {
    renderGameState(gameState);
    setTimeout(() => showNotification("¡La partida comienza! Eres Barbanegra."), 500);
});

// Evento crítico para recalcular los márgenes de las cartas si el usuario redimensiona la ventana
window.addEventListener('resize', () => {
    updateHand(gameState.myHand);
});