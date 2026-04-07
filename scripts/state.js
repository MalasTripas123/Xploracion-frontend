import { updatePlayers } from './ui/player.js';
import { updateBoard } from './ui/board.js';
import { updateHand } from './ui/hand.js';

export let gameState = {
    currentRound: 0,
    turn: 0,
    currentPlayerId: "p1",
    myPlayerId: "p1",
    deck: {
        basicDeck: [],
        specialDeck: [],
        currentDeck: [],
    },
    discard: [{ id: "c100", name: "Cáliz Antiguo", type: "artefacto", value: 15 }],
    players: [
        { id: "p1", name: "Player 1", hand: [], coins: 10 },
        { id: "p2", name: "Player 2", hand: [], coins: 10 },
        { id: "p3", name: "Player 3", hand: [], coins: 10 },
        { id: "p4", name: "Player 4", hand: [], coins: 10 },
    ],
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
    updateHand(state.players.find(p => p.id === state.currentPlayerId).hand);
}