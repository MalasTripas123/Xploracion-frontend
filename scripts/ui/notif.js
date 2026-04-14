import { elements } from '../state.js';

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
        `La mitad de tus cartas (${stolenCards.length})` :
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