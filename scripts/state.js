export let gameState = {
    currentRound: 0,
    turn: 0,
    myPlayerId: "p1",
    deck: {
        basicDeck: [],
        specialDeck: [],
        currentDeck: [],
    },
    discard: [],
    players: [
        { id: "p1", name: "Player 1", hand: [], coins: 10 },
        { id: "p2", name: "Player 2", hand: [], coins: 10 },
        { id: "p3", name: "Player 3", hand: [], coins: 10 },
        { id: "p4", name: "Player 4", hand: [], coins: 10 },
    ],
    turnState: 'initial', // initial: permite todas las acciones - explored: bloquea la excavación - paused: bloquea todas las acciones
};

export let selectedCards = new Set();

export const elements = {
    currentRound: document.getElementById('current-round-display'),
    myCardCount: document.getElementById('my-card-count'),
    currentTurn: document.getElementById('current-turn-display'),
    playersContainer: document.getElementById('players-container'),
    deckCount: document.getElementById('deck-count'),
    discardCount: document.getElementById('discard-count'),
    discardElement: document.getElementById('discard-element'),
    discardContent: document.getElementById('discard-content'),
    myCoins: document.getElementById('my-coins'),
    handContainer: document.getElementById('hand-container'),
    piecesCountContainer: document.getElementById('hand-header-pieces-count'),
    notifications: document.getElementById('notifications-container'),
    actionButtons: document.getElementById('action-buttons')
};