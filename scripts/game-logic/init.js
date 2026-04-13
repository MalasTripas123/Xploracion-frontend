import { buildDeck, shuffle } from "./deck.js";
import { gameState, elements } from '../state.js'
import { moveCards } from './basic-actions.js'

// acá se inicia el juego
export function initGame() {
    buildDeck();
    setPlayers();
    initialDeckSetup();
    gameState.totalTurns++;
    gameState.currentRound++;
}

function initialDeckSetup() {
    let currentDeck = gameState.deck.currentDeck;
    gameState.deck.basicDeck.map(card => { currentDeck.push(structuredClone(card)); });
    gameState.players.forEach(player => {
        moveCards(currentDeck, player.hand, 7);
    });
    gameState.deck.specialDeck.map(card => { currentDeck.push(structuredClone(card)); });
    shuffle(currentDeck);
}

function setPlayers() {
    gameState.players = [
        { id: "p1", name: "Player 1", hand: [], coins: 10 },
        { id: "p2", name: "Player 2", hand: [], coins: 10 },
        { id: "p3", name: "Player 3", hand: [], coins: 10 },
        { id: "p4", name: "Player 4", hand: [], coins: 10 },
    ]
}