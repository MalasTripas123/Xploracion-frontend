import { initActionEvents } from '../game-logic/actions.js';
import { initGame } from '../game-logic/init.js';
import { getPiecesParced } from '../game-logic/parce-card.js';
import { counterResponseAction } from '../game-logic/trick.js';
import { elements, gameState } from '../state.js';
import { renderGameState } from '../ui.js';

export function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    elements.notifications.appendChild(notif);
    setTimeout(() => {
        if (notif.parentNode) notif.parentNode.removeChild(notif);
    }, 3000);
}

export function banditNotification(banditCard, stolenCards, coins) {
    const bounty = banditCard.name === 'BANDIDO MEDIA MANO' ? 
        `La mitad de tus cartas al azar (${stolenCards.length} cartas)` :
        banditCard.name === 'BANDIDO SELECTIVO' ?
            `Tus cartas más valiosas (${stolenCards.length} x ${stolenCards[0].type})` :
            banditCard.name === 'BANDIDO CODICIOSO' ?
                `La mitad de tus monedas (${coins})` : '';

    elements.bigNotifications.innerHTML = '';
    elements.bigNotifications.className = 'big-notifications-container active';

    const title = document.createElement('div');
    title.innerHTML += `
        <div class="big-notifications-title" style="top: 5px;">Fuiste asaltado por:</div>
    `;
    elements.bigNotifications.appendChild(title);

    const notif = document.createElement('div');
    notif.className = 'big-notification';

    const cardEl = document.createElement('div');
    cardEl.className = 'bandit-card';
    cardEl.innerHTML = `
        <div style="display: flex; flex-direction: row;">
            <div class="card-symbol">${banditCard.symbol}</div>
            <div class="card-title">${banditCard.name}</div>
        </div>
        <div class="card-id">ID: ${banditCard.id}</div>
    `;
    notif.appendChild(cardEl);
    elements.bigNotifications.appendChild(notif);

    const subTitle = document.createElement('div');
    subTitle.innerHTML += `
        <div class="big-notifications-title">Y te robó:</div>
        <div class="big-notifications-title">${bounty}</div>
    `;
    elements.bigNotifications.appendChild(subTitle);

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML += `
        <div class="trick-player-selector-close">Volver</div>
    `;
    closeBtn.addEventListener('click', () => {
        elements.bigNotifications.innerHTML = '';
        elements.bigNotifications.className = 'trick-player-selector';
    });
    elements.bigNotifications.appendChild(closeBtn);
}

export function trickedNotification(trickedPlayerTurn, availableBandits, currentPlayerTurn, pickedCard) {
    elements.bigNotifications.innerHTML = '';
    elements.bigNotifications.className = 'big-notifications-container active';

    // mensaje de usted está siendo asaltado por:
    // mensaje de esta carta te están robando:
    const title = document.createElement('div');
    title.innerHTML += `
        <div class="big-notifications-title" style="top: 5px;">Fuiste asaltado por: ${gameState.players[currentPlayerTurn].name}</div>
        <div class="big-notifications-title" style="top: 5px;">Te quiere robar: ${pickedCard.name}</div>
    `;
    elements.bigNotifications.appendChild(title);

    const notif = document.createElement('div');
    notif.className = 'big-notification';

    const cardEl = document.createElement('div');
    cardEl.className = 'bandit-card';
    cardEl.innerHTML = `
        <div style="display: flex; flex-direction: row;">
            <div class="card-symbol">${pickedCard.symbol}</div>
            <div class="card-title">${pickedCard.name}</div>
        </div>
        <div class="card-type">${pickedCard.type}</div>
        <div class="card-pieces">${getPiecesParced(pickedCard)}</div>
        <div class="card-value">${pickedCard.price}</div>
        <div class="card-id">ID: ${pickedCard.id}</div>
    `;
    notif.appendChild(cardEl);
    elements.bigNotifications.appendChild(notif);

    // mostrar mensaje de quiere responder? -- "Quieres mostrarle quién manda?"
    const subTitle = document.createElement('div');
    subTitle.innerHTML += `
        <div class="big-notifications-title">Pero tú eres compinche de los bandidos</div>
        <div class="big-notifications-title">Quieres responder a su ofensa?</div>
    `;
    elements.bigNotifications.appendChild(subTitle);

    // mostrar opciones de bandidos para responder
    availableBandits.forEach(banditCard => {
        const banditBtn = document.createElement('div');
        banditBtn.innerHTML += `
            <div class="trick-player-selector-close">Atacar con el ${banditCard.name}</div>
        `;
        banditBtn.addEventListener('click', () => {
            elements.bigNotifications.innerHTML = '';
            elements.bigNotifications.className = 'trick-player-selector';
            //! vuelve al pov original
            gameState.turn = currentPlayerTurn;
            renderGameState(gameState);
            counterResponseAction('assault', banditCard, currentPlayerTurn, trickedPlayerTurn, pickedCard);
        });
        elements.bigNotifications.appendChild(banditBtn);
    });

    // botón de no responder
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML += `
        <div class="trick-player-selector-close">Volver</div>
    `;
    closeBtn.addEventListener('click', () => {
        elements.bigNotifications.innerHTML = '';
        elements.bigNotifications.className = 'trick-player-selector';
        //! vuelve al pov original
        gameState.turn = currentPlayerTurn;
        renderGameState(gameState);
        counterResponseAction('trick', null, currentPlayerTurn, trickedPlayerTurn, pickedCard);
    });
    elements.bigNotifications.appendChild(closeBtn);

}

export function winNotification() {
    elements.bigNotifications.innerHTML = '';
    elements.bigNotifications.className = 'big-notifications-container active';

    const title = document.createElement('div');
    title.innerHTML += `
        <div class="big-notifications-title" style="top: 5px;">HAZ GANADO LA PARTIDA</div>
    `;
    elements.bigNotifications.appendChild(title);

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML += `
        <div class="trick-player-selector-close">Reiniciar</div>
    `;
    closeBtn.addEventListener('click', () => {
        elements.bigNotifications.innerHTML = '';
        elements.bigNotifications.className = 'trick-player-selector';

        gameState.currentRound = 0;
        gameState.turn = 0,
        gameState.totalTurns = 0,
        gameState.myPlayerId = "p1",
        gameState.deck = {
            basicDeck: [],
            specialDeck: [],
            currentDeck: [],
        },
        gameState.discard = [],
        gameState.soldClues = [],
        gameState.players = [],
        gameState.turnState = 'initial',
        initGame();
        renderGameState(gameState);
        initActionEvents();
        setTimeout(() => showNotification(`¡La partida comienza! Eres ${gameState.players[gameState.turn].name}.`), 500);
    });
    elements.bigNotifications.appendChild(closeBtn);
}

export function looseNotification() {
    elements.bigNotifications.innerHTML = '';
    elements.bigNotifications.className = 'big-notifications-container active';

    const title = document.createElement('div');
    title.innerHTML += `
        <div class="big-notifications-title" style="top: 5px;">Haz perdido por pasar el turno sin monedas</div>
    `;
    elements.bigNotifications.appendChild(title);

    const closeBtn = document.createElement('div');
    closeBtn.innerHTML += `
        <div class="trick-player-selector-close">Ok</div>
    `;
    closeBtn.addEventListener('click', () => {
        gameState.turn = (gameState.turn + 1) % gameState.players.length;
        gameState.currentRound += gameState.turn === 0 ? 1 : 0;
        gameState.totalTurns++;

        gameState.currentPlayerId = gameState.players[gameState.turn].id;
        gameState.turnState = 'initial';
        renderGameState(gameState);
    });
    elements.bigNotifications.appendChild(closeBtn);
}