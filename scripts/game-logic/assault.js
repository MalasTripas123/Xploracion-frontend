import { gameState } from "../state.js";
import { banditNotification } from "../ui/notif.js";
import { shuffle, shuffleAll } from "./deck.js";

export function assaultOnExplore(banditCard, assaultedPlayer) {
    const stolenCards = getStolenCards(banditCard, assaultedPlayer);
    // enviar al descarte
    if (stolenCards) {
        if (typeof stolenCards !== 'number') gameState.discard.push(...stolenCards);
    }
    // revolver todo
    shuffleAll();
    // notificar
    banditNotification(banditCard, stolenCards, stolenCards);
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

function selective(assaultedPlayer) {
    if (gameState.players[assaultedPlayer].hand.length < 1) return null;
    // prioridad de cartas
    const priority = ["MAPA", "COPIA", "RELIQUIA", "TROZO03", "TROZO02", "TROZO01", "PAPEL", "PISTA", "BANDIDO"];
    // aplica la prioridad
    let chosenType = null;

    for (const type of priority) {
        for (const card of gameState.players[assaultedPlayer].hand) {
            if (card.type === type) {
                chosenType = type;
                break;
            }
        }
        if (chosenType) break;
    }
    // roba las cartas más valiosas
    const hand = gameState.players[assaultedPlayer].hand;
    const stolenCards = hand.filter(card => card.type === chosenType);

    gameState.players[assaultedPlayer].hand = hand.filter(card => card.type !== chosenType);

    return stolenCards;
}

function greedy(assaultedPlayer) {
    
    const stolenCoins = Math.ceil(gameState.players[assaultedPlayer].coins / 2);
    gameState.players[assaultedPlayer].coins -= stolenCoins;
    return stolenCoins;
}