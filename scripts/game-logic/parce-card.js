export function parceCard(card) {
    return card.name + (card.pieces != null && card.pieces.length > 0 ? '(' + card.pieces.map(p => '[' + p + ']').join('') + ')' : '');
}

export function getPiecesParced(card) {
    return card.pieces != null && card.pieces.length > 0 ? card.pieces.map(p => '[' + p + ']').join('') : '';
}