import { gameState } from "../state.js";
import { banditNotification } from "../ui/notif.js";
import { shuffle, shuffleAll } from "./deck.js";
import { autoPassTurn, passTurn } from "./turn.js";
import { hasWon } from "./win-lose-condition.js";

export function assaultOnExplore(banditCard, assaultedPlayer) {
    const stolenItems = getStolenCards(banditCard, assaultedPlayer);
    // enviar al descarte
    if (stolenItems) {
        if (typeof stolenItems !== 'number') gameState.discard.push(...stolenItems);
    }
    // revolver todo
    shuffleAll();
    // notificar
    banditNotification(banditCard, stolenItems, stolenItems);
    // pasar turno
}

export function assaultAsCounter(banditCard, currentPlayerTurn, trickedPlayerTurn) {
    console.log(gameState.players[currentPlayerTurn]);
    const stolenItems = getStolenCards(banditCard, currentPlayerTurn);
    // enviar al jugador que respondió
    if (stolenItems) {
        if (typeof stolenItems !== 'number') gameState.players[trickedPlayerTurn].hand.push(...stolenItems);
        if (typeof stolenItems === 'number') gameState.players[trickedPlayerTurn].coins += stolenItems;
    }
    gameState.discard.push(banditCard);
    gameState.players[trickedPlayerTurn].hand = gameState.players[trickedPlayerTurn].hand.filter(card => card.id != banditCard.id)
    // revolver todo
    shuffleAll();
    // notificar
    banditNotification(banditCard, stolenItems, stolenItems);
    //
    hasWon(gameState.players[trickedPlayerTurn]);
    // pasar turno
    if (gameState.turnState === 'paused') autoPassTurn(10);
}

function getStolenCards(banditCard, assaultedPlayer) {
    if (banditCard.name === 'BANDIDO MEDIA MANO') return halfHand(assaultedPlayer);
    if (banditCard.name === 'BANDIDO SELECTIVO') return selective(assaultedPlayer);
    if (banditCard.name === 'BANDIDO CODICIOSO') return greedy(assaultedPlayer);
}

function halfHand(assaultedPlayer) {
    const player = gameState.players[assaultedPlayer];
    if (player.hand.length < 1) return null;

    // mezclar
    player.hand = shuffle(player.hand);

    const stealAmmount = Math.floor(player.hand.length / 2);

    // separar
    const stolenCards = player.hand.slice(0, stealAmmount);
    player.hand = player.hand.slice(stealAmmount);

    return stolenCards;
}

function selective(assaultedPlayerIndex) {
    if (gameState.players[assaultedPlayerIndex].hand.length < 1) return null;
    // prioridad de cartas
    const priority = ["MAPA", "COPIA", "RELIQUIA", "TROZO03", "TROZO02", "TROZO01", "PAPEL", "PISTA", "BANDIDO"];
    // aplica la prioridad
    let chosenType = null;

    for (const type of priority) {
        for (const card of gameState.players[assaultedPlayerIndex].hand) {
            if (card.type === type) {
                chosenType = type;
                break;
            }
        }
        if (chosenType) break;
    }
    // roba las cartas más valiosas
    const hand = gameState.players[assaultedPlayerIndex].hand;
    const stolenCards = hand.filter(card => card.type === chosenType);

    gameState.players[assaultedPlayerIndex].hand = hand.filter(card => card.type !== chosenType);

    return stolenCards;
}

function greedy(assaultedPlayer) {
    const stolenCoins = Math.ceil(gameState.players[assaultedPlayer].coins / 2);
    gameState.players[assaultedPlayer].coins -= stolenCoins;
    return stolenCoins;
}