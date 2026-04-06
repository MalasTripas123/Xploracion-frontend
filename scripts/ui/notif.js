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