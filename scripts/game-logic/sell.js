import { showNotification } from '../ui/notif.js';
import { gameState, elements, selectedCards } from '../state.js';
import { renderGameState } from '../ui.js';
import { discard } from './basic-actions.js';
import { parceCard } from './parce-card.js';
import { shuffle } from './deck.js';

export function sell() {
    if (selectedCards.size === 0) return showNotification("¡Selecciona botín para vender!");
    const arraySelectedCards = Array.from(selectedCards);
    if (arraySelectedCards[0].type === 'BANDIDO') return showNotification("¡No se puede vender un bandido!");
    if (arraySelectedCards[0].type === 'PISTA' && selectedCards.size === 1) return showNotification("Debes elegir una segunda pista para vender!");

    //! necesita resestructuración para usar la función discard
    // pero funciona
    
    // se quitan las cartas vendidas de la mano
    gameState.players[gameState.turn].hand = gameState.players[gameState.turn].hand.filter(c => !selectedCards.has(c));
    // se suman las monedas
    gameState.players[gameState.turn].coins += arraySelectedCards.length === 2 ? 1 : arraySelectedCards[0].price;

    // si la carta vendida es reliquia o pista
    if (arraySelectedCards[0].type === 'RELIQUIA' || arraySelectedCards[0].type === 'PISTA') {
        // si es pista se envía a la zona de pistas
        if (arraySelectedCards[0].type === 'PISTA') {
            arraySelectedCards.forEach(selectedCard => {
                gameState.soldClues.push(selectedCard);
            });
            document.getElementById('clue-counter').innerText = 'Pistas: ' + gameState.soldClues.length;
        }
        // si es reliquia nada, desaparece de la faz del universo
    // si la carta vendida es mapa, copia o papel se devuelven a la baraja y se revuelve
    } else if (['MAPA', 'COPIA', 'PAPEL'].includes(arraySelectedCards[0].type)) {
        if (arraySelectedCards[0].type === 'MAPA') arraySelectedCards[0].price--;
        arraySelectedCards.forEach(selectedCard => {
            gameState.deck.currentDeck.push(selectedCard);
            shuffle(gameState.deck.currentDeck);
        });
    // si la carta vendida no es ninguna de las anteriores debe ser un trozo y se envía al descarte
    } else {
        arraySelectedCards.forEach(selectedCard => {
            gameState.discard.push(selectedCard);
        });
    }

    showNotification(`La vieja María compra de todo.`);
    showNotification(`Vendiste: ${arraySelectedCards.length === 2 ? '2 pistas' : parceCard(arraySelectedCards[0])}`);
    // mensajes adicionales si era reliquia o mapa completo
    if (arraySelectedCards[0].type === 'RELIQUIA') showNotification("Esa reliquia nunca volverá.");
    if (arraySelectedCards[0].type === 'MAPA') showNotification("El mapa del tesoro ha perdido valor.");
    gameState.turnState = 'paused';
    renderGameState(gameState);
}