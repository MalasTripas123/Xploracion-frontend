export function parceCard(card){
    return card.name + (card.pieces != null && card.pieces.length ? '(' + card.pieces.map(p => '[' + p + ']').join('') + ')' : '');
}