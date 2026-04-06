import { updatePlayers } from './ui/player.js';
import { updateBoard } from './ui/board.js';
import { updateHand } from './ui/hand.js';

/**
 * 1. ESTADO FALSO DEL JUEGO (Con 12 cartas para demostrar la compresión)
 */
export let gameState = {
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

export let selectedCards = new Set();

export const elements = {
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

export function renderGameState(state) {
    elements.currentRound.textContent = state.currentRound;
    updatePlayers(state);
    updateBoard(state);
    updateHand(state.myHand);
}