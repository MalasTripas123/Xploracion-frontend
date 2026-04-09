import { elements, selectedCards } from '../state.js';

export function updateHand(cards) {
    elements.handContainer.innerHTML = ''; 
    elements.myCardCount.innerHTML = `Cartas en mano: <strong class="highlight">${cards.length}</strong>`;
    
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
            <div class="card-title">${card.name}</div>
            <div class="card-type">${card.type}</div>
            <div class="card-value">${card.price}</div>
            <div class="card-id">ID: ${card.id}</div>
        `;

        cardEl.addEventListener('click', () => handleCardClick(card.id, cardEl));
        elements.handContainer.appendChild(cardEl);
    });
}

function handleCardClick(cardId, element) {
    if (selectedCards.has(cardId)) {
        selectedCards.delete(cardId);
        element.classList.remove('selected');
    } else {
        selectedCards.add(cardId);
        element.classList.add('selected');
    }
}