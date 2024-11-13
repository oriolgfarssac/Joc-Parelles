const main = new BroadcastChannel("main");

let punts = 0;
let estatPartida = "Sense Jugar";
let win;

const displayData = () =>{
    //Declaro variables que després utilizare
    let userUrl = document.getElementById('urlInfo');
    let browserInfo = document.getElementById('browserInfo');

    userUrl.textContent = window.location.href;
    browserInfo.textContent = navigator.userAgent;
}

const startGame = () => {

    let playerName = localStorage.getItem('playerName');  
    let infoGame = document.getElementById('infoGame');

    if (!playerName || playerName.trim() === "") {
        playerName = document.getElementById('playerName').value;

        if (playerName.trim() !== "") {

            localStorage.setItem('playerName', playerName);
        } else {
            alert("Introdueix un nom per poder jugar.");
            return; 
        }
    }
    updateScore();
    estatPartida = "En joc";
    document.cookie = `playerName=${playerName}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
    infoGame.textContent = `NOM: ${playerName}, PUNTS: ${punts}, ESTAT PARTIDA: ${estatPartida}`;
    win = window.open("/Game/game.html");
    sendDataToOtherWindow();
}

const resetGame = () => {

    localStorage.removeItem('playerName');

    document.cookie = 'playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    estatPartida = "Partida Reiniciada";
    infoGame.textContent = `No hi ha cap partida en joc`;
    if(win){
        win.close();
    }
    alert("La partida ha sigut reiniciada.");

}

function updateScore() {

    if (localStorage.getItem('punts') === null) {
        localStorage.setItem('punts', punts);
        infoGame.textContent = `NOM: ${playerName}, PUNTS: ${punts}, ESTAT PARTIDA: ${estatPartida}`;
    } else {
        punts = localStorage.getItem('punts');
        infoGame.textContent = `NOM: ${playerName}, PUNTS: ${punts}, ESTAT PARTIDA: ${estatPartida}`;
    }
}


const sendDataToOtherWindow = () => {
    setTimeout(() => {
        let playerName = localStorage.getItem('playerName');
        let punts = localStorage.getItem('punts');

        console.log("Sending Data after delay:", { name: playerName, points: punts });

        main.postMessage({
            name: playerName,
            points: punts
        });
    }, 100);
}







window.onload = () =>{
    displayData();
}