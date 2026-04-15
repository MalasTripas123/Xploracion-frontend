export let gameState = {
    currentRound: 0,
    turn: 0,
    totalTurns: 0,
    myPlayerId: "p1",
    deck: {
        basicDeck: [],
        specialDeck: [],
        currentDeck: [],
    },
    discard: [],
    soldClues: [],
    players: [],
    turnState: 'initial', // initial: permite todas las acciones - explored: bloquea la excavación - paused: bloquea todas las acciones - stoped: el juego se ha detenido porque alguien ganó
};

export let selectedCards = new Set();

export const elements = {
    currentRound: document.getElementById('current-round-display'),
    currentTurn: document.getElementById('current-turn-display'),
    currentPlayer: document.getElementById('current-player-display'),
    myCardCount: document.getElementById('my-card-count'),
    playersContainer: document.getElementById('players-container'),
    deckCount: document.getElementById('deck-count'),
    discardCount: document.getElementById('discard-count'),
    discardElement: document.getElementById('discard-element'),
    discardContent: document.getElementById('discard-content'),
    myCoins: document.getElementById('my-coins'),
    handContainer: document.getElementById('hand-container'),
    piecesCountContainer: document.getElementById('hand-header-pieces-count'),
    notifications: document.getElementById('notifications-container'),
    bigNotifications: document.getElementById('big-notifications-container'),
    actionButtons: document.getElementById('action-buttons'),
    trickPlayerSelectorContainer: document.getElementById('trick-player-selector-container'),
};