import { gameState } from "../state.js";
import { renderGameState } from "../ui.js";
import { winNotification } from "../ui/notif.js";

export function hasWon(player) {
    const activePieces = [];
    const cards = player.hand;
    cards.forEach(card => {
        if (card.pieces !== null) {
            card.pieces.forEach(piece => {
                if (!activePieces.includes(piece)) activePieces.push(piece);
            });
        }
        if (card.type === 'PAPEL') {
            activePieces.push('MP');
        }
    });
    if (activePieces.length > 9 && player.coins >= 10) {
        console.log('detenido el juego');
        gameState.turnState = 'stoped';
        renderGameState(gameState);

        // notif
        winNotification();
    }
}

export function looseByCoins() {
    if (gameState.players[gameState.turn].coins < 1) {
        gameState.players[gameState.turn].state = 'defeated';
        return true;
    }
    return false;
}