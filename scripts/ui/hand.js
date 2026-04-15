import { elements, selectedCards, gameState } from '../state.js';
import { getPiecesParced } from '../game-logic/parce-card.js';
import { toggleButtons } from '../ui.js';

export function updateHand(cards) {

    cards.sort((a, b) => a.id - b.id);

    elements.handContainer.innerHTML = ''; 
    elements.myCardCount.innerHTML = `Cartas en mano: <strong class="highlight">${cards.length}</strong>`;
    elements.myCoins.textContent = gameState.players[gameState.turn].coins;
    
    const previousSelection = new Set(selectedCards);
    selectedCards.clear();

    // Solución 1: Calcular la superposición (overlap) dinámicamente según el espacio real.
    // Ancho del contenedor (quitamos 40px por el padding lateral de la UI)
    const containerWidth = elements.handContainer.clientWidth || window.innerWidth - 40; 
    const cardWidth = 130;
    let dynamicMargin = -30; // Margen base negativo si hay pocas cartas

    if (cards.length > 1) {
        // Si pusiéramos todas las cartas con el margen base, ¿cuánto ocuparían?
        const estimatedWidth = cardWidth + (cards.length - 1) * (cardWidth + dynamicMargin);
        
        // Si superan el tamaño de la pantalla/contenedor, calculamos cuánto deben comprimirse
        if (estimatedWidth > containerWidth) {
            // Fórmula: (Ancho Disponible - Ancho de la primera carta) / Espacios entre cartas - Ancho de la carta
            dynamicMargin = ((containerWidth - cardWidth) / (cards.length - 1)) - cardWidth;
            
            // Aseguramos que nunca se oculten por completo (dejamos al menos 25px visibles)
            dynamicMargin = Math.max(dynamicMargin, -105);
        }
    }

    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = card.id;
        
        // Z-index estrictamente en orden ascendente (derecha cubre a izquierda)
        cardEl.style.zIndex = index;

        // Aplicamos el margen dinámico calculado a todas las cartas menos a la primera
        if (index > 0) {
            cardEl.style.marginLeft = `${dynamicMargin}px`;
        }

        if (previousSelection.has(card.id)) {
            cardEl.classList.add('selected');
            selectedCards.add(card.id);
        }

        cardEl.innerHTML = `
            <div style="display: flex; flex-direction: row;">
                <div class="card-symbol">${card.symbol}</div>
                <div class="card-title">${card.name}</div>
            </div>
            <div class="card-type">${card.type}</div>
            <div class="card-pieces">${getPiecesParced(card)}</div>
            <div class="card-value">${card.price}</div>
            <div class="card-id">ID: ${card.id}</div>
        `;

        cardEl.addEventListener('click', () => handleCardClick(card, cardEl, elements.handContainer));
        elements.handContainer.appendChild(cardEl);
    });

    // marcar trozos obtenidos:
    const activePieces = [];
    cards.forEach(card => {
        if (card.pieces === null) return;
        card.pieces.forEach(piece => {
            if (!activePieces.includes(piece)) activePieces.push(piece);
        });
    });
    elements.piecesCountContainer.innerHTML = 'Tozos de mapa obtenidos:' + ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(piece => `
        <div class="owned-piece ${activePieces.includes(piece) ? 'active' : ''}">${piece}</div>`
    ).join('');
    let hasMagicPaper = false;
    gameState.players[gameState.turn].hand.map(card => {
        if (card.type === 'PAPEL') hasMagicPaper = true;
    });
    elements.piecesCountContainer.innerHTML += `<div class="owned-piece ${hasMagicPaper ? 'active' : ''}">PM</div>`
}

function handleCardClick(card, element, cardsInDOM) {
    // 1. Si la carta clickeada ya estaba seleccionada, la deseleccionamos y salimos.
    if (selectedCards.has(card)) {
        selectedCards.delete(card);
        element.classList.remove('selected');
        toggleButtons();
        return;
    }

    // Evitamos convertir el Set a Array múltiples veces por rendimiento
    const firstSelected = Array.from(selectedCards)[0];

    // 2. Si hay al menos una carta seleccionada, pero la primera O la nueva NO son 'PISTA', reseteamos todo.
    if (selectedCards.size > 0 && (firstSelected.type !== 'PISTA' || card.type !== 'PISTA')) {
        selectedCards.clear();
        // Optimización sugerida: buscar solo los divs que tengan la clase 'selected'
        cardsInDOM.querySelectorAll("div.selected").forEach(child => {
            child.classList.remove('selected');
        });
    } 
    // 3. Si ya hay 2 cartas seleccionadas (y ambas son PISTA por la validación anterior), 
    // deseleccionamos la más antigua para hacerle espacio a la nueva.
    else if (selectedCards.size === 2) {
        document.querySelector(`[data-id="${firstSelected.id}"]`).classList.remove('selected');
        selectedCards.delete(firstSelected);
    }

    // 4. ACCIÓN COMÚN: Se ejecuta para el primer click, después de un reseteo (paso 2), 
    // cuando solo había 1 pista, o tras quitar la pista antigua (paso 3).
    selectedCards.add(card);
    element.classList.add('selected');
    toggleButtons();
}