import { gameState, elements } from "../state.js";

let cardId = 0;

export function buildDeck(){
    const deck = gameState.deck
    let basicCards = [];
    let specialCards = [];
    
    const cardModel = {
        id: '',
        type: '', // PISTA - TROZO (01, 02, 03) - PAPEL - RELIQUIA - MAPA - COPIA - BANDIDO
        price: 0, // PISTA 0 - TROZO 1 A 3 (según lantidad de letras) - PAPEL 2 - RELIQUIA 3 A 7 - MAPA 8 - COPIA 7 - BANDIDO 0
        pieces: [],
        name: '',
        symbol: '', // 0 - I - II - III - P - V - X - C - B
        sprite: '',
    }

    buildBasicDeck();
    shuffle(basicCards);
    deck.basicDeck.push(...basicCards);
    buildSpecialDeck();
    shuffle(specialCards);
    deck.specialDeck.push(...specialCards);

    function buildBasicDeck() {
        // agrega cartas de un trozo
        const cardLetter = 'ABCDEFGHIJ';
        for (let char of cardLetter) {
            for (let i = 0; i < 3; i++) {
                const newCard = {...cardModel};

                newCard.id = cardId++;
                newCard.type = 'TROZO01';
                newCard.price = 1;
                newCard.pieces = [char];
                newCard.name = 'TROZO DE MAPA';
                newCard.symbol = 'I';
                newCard.sprite = '' //¿ pendiente

                basicCards.push(newCard);
            }
        }
        // agrega cartas de dos trozos
        const doubleLetterCombinations = [
            ["A", "I"],
            ["A", "C"],
            ["B", "J"],
            ["B", "D"],
            ["C", "E"],
            ["D", "F"],
            ["E", "G"],
            ["F", "H"],
            ["G", "I"],
            ["H", "J"],
        ];
        for (let combination of doubleLetterCombinations) {
            for (let i = 0; i < 2; i++) {
                const newCard = {...cardModel};

                newCard.id = cardId++;
                newCard.type = 'TROZO02';
                newCard.price = 2;
                newCard.pieces = combination;
                newCard.name = 'TROZO DE MAPA';
                newCard.symbol = 'II';
                newCard.sprite = '' //¿ pendiente

                basicCards.push(newCard);
            }
        }
        // agrega cartas de 3 trozos
        const tripleLetterCombinations = [
            ["A", "G", "H"],
            ["A", "B", "E"],
            ["A", "D", "J"],
            ["B", "C", "F"],
            ["B", "H", "I"],
            ["C", "D", "G"],
            ["C", "I", "J"],
            ["D", "E", "H"],
            ["E", "F", "I"],
            ["F", "G", "J"],
        ];
        for (let combination of tripleLetterCombinations) {
            const newCard = {...cardModel};

            newCard.id = cardId++;
            newCard.type = 'TROZO03';
            newCard.price = 3;
            newCard.pieces = combination;
            newCard.name = 'TROZO DE MAPA';
            newCard.symbol = 'III';
            newCard.sprite = '' //¿ pendiente

            basicCards.push(newCard);
        }
        // agrega pistas
        for (let i = 0; i < 40; i++) {
            const newCard = {...cardModel};

            newCard.id = cardId++;
            newCard.type = 'PISTA';
            newCard.price = 0;
            newCard.pieces = null;
            newCard.name = 'PISTA';
            newCard.symbol = 'P';
            newCard.sprite = '' //¿ pendiente

            basicCards.push(newCard);
        }
    }

    function buildSpecialDeck() {
        specialCards.push({id: cardId++, type: "RELIQUIA", price: 3, pieces: null, name: "CUCHARA", symbol: "R", sprite: ''});
        specialCards.push({id: cardId++, type: "RELIQUIA", price: 4, pieces: null, name: "ANILLO", symbol: "R", sprite: ''});
        specialCards.push({id: cardId++, type: "RELIQUIA", price: 5, pieces: null, name: "CÁLIZ", symbol: "R", sprite: ''});
        specialCards.push({id: cardId++, type: "RELIQUIA", price: 6, pieces: null, name: "ARPA", symbol: "R", sprite: ''});
        specialCards.push({id: cardId++, type: "RELIQUIA", price: 7, pieces: null, name: "DIAMANTE", symbol: "R", sprite: ''});
        
        specialCards.push({
            id: cardId++,
            type: "MAPA",
            price: 8,
            pieces: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            name: "MAPA DEL TESORO",
            symbol: "X",
            sprite: ''
        });

        specialCards.push({
            id: cardId++,
            type: "COPIA",
            price: 7,
            pieces: ["B", "C", "E", "F", "H", "I", "J"],
            name: "COPIA INCOMPLETA",
            symbol: "VII",
            sprite: ''
        });

        specialCards.push({id: cardId++, type: "PAPEL", price: 2, pieces: null, name: "PAPEL MÁGICO", symbol: "M", sprite: ''});
        specialCards.push({id: cardId++, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO MEDIA MANO", symbol: "B", sprite: ''});
        specialCards.push({id: cardId++, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO SELECTIVO", symbol: "B", sprite: ''});
        specialCards.push({id: cardId++, type: "BANDIDO", price: 0, pieces: null, name: "BANDIDO CODICIOSO", symbol: "B", sprite: ''});
    }
}


export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleAll() {
    gameState.deck.currentDeck.push(...gameState.soldClues);
    gameState.deck.currentDeck.push(...gameState.discard);
    
    gameState.soldClues = [];
    gameState.discard = [];

    elements.discardElement.classList.add('empty');

    shuffle(gameState.deck.currentDeck);
}