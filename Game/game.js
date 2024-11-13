const main = new BroadcastChannel("main");

let flippedCards = [];
let matchedCards = [];
let score = 0;

const cards = [
    { id: 1, value: 'A' },
    { id: 2, value: 'A' },
    { id: 3, value: 'B' },
    { id: 4, value: 'B' },
    { id: 5, value: 'C' },
    { id: 6, value: 'C' },
    { id: 7, value: 'D' },
    { id: 8, value: 'D' },
    { id: 9, value: 'E' },
    { id: 10, value: 'E' },
    { id: 11, value: 'F' },
    { id: 12, value: 'F' },
    { id: 13, value: 'G' },
    { id: 14, value: 'G' },
    { id: 15, value: 'H' },
    { id: 16, value: 'H' },
    { id: 17, value: 'I' },
    { id: 18, value: 'I' },
    { id: 19, value: 'J' },
    { id: 20, value: 'J' }
];

const checkStatus = () =>{
    
    if (sessionStorage.getItem('partidaActiva') === 'true') {
        alert("Ja hi ha una partida començada. Aquesta finestra es tancarà.");
        window.close();  
    } else {
    
        sessionStorage.setItem('partidaActiva', 'true');
    
    }

}



function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const cardContainer = document.querySelector('.card-container');
shuffleArray(cards);

cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-id', card.id);
    cardElement.setAttribute('data-value', card.value);
    cardElement.addEventListener('click', flipCard);
    cardContainer.appendChild(cardElement);
});


function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 10;
        updateScore();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            if(score >= 5){
                score-=3;
                updateScore();
            }

        }, 300);
    }

    flippedCards = [];
    checkGameOver();
}


function updateScore() {
    const scoreElement = document.getElementById('points');
    scoreElement.textContent = `Puntos: ${score}`;
}


function checkGameOver() {
    if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
            window.open('/Win/win.html', 'Win', 'width=400,height=400');
        }, 500);
    }
}


const showInstructions = () =>{
    window.open('/Popup/popup.html', 'Popup', 'width=400,height=400');

}

 
main.onmessage = (event) => {
    console.log("Received Data:", event.data);  

    const { name, points } = event.data;

    let playerNameElement = document.getElementById('namePlayer');
    let playerPointsElement = document.getElementById('points');

    if (playerNameElement && playerPointsElement) {
        playerNameElement.textContent = name;
        playerPointsElement.textContent = `Punts: ${points}`;
    }
};



window.onload = () =>{
    checkStatus();
}