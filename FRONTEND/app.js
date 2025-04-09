let gameState = {
    currentState: [
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'C', '-', '-', '-'],
        ['-', '-', '-', 'B', '-', '-', '-'],
        ['-', '-', 'C', '-', 'B', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', 'P', 'B', '-', '-', '-', '-'],
        ['-', 'B', 'B', '-', '-', '-', '-'],
        ['-', 'B', 'B', 'B', '-', '-', '-'],
    ],
    numOfCoins: 0,
    isInPlay: true
};

async function DrawOutFromResp(answ){
    let grid = document.querySelector('#grid')
    grid.innerHTML = ''
    let inpt = await answ.json()
    gameState.currentState = inpt.currentState
    gameState.isInPlay = inpt.isInPlay
    gameState.numOfCoins = inpt.numOfCoins
    if(inpt.isInPlay === true){
    for (let i = 0; i < inpt.currentState.length; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < inpt.currentState[i].length; j++) {
            let td = document.createElement('td')
            td.textContent = inpt.currentState[i][j]
            tr.appendChild(td)
        }
        grid.appendChild(tr)
    }}
    else{
        let body = document.querySelector('#body')
        body.innerHTML = ''
        let img = document.createElement('img')
        img.src = "/pics/bomb.png"
        body.appendChild(img)
    }
}
function FirstDrawout(){
    for (let i = 0; i < gameState.currentState.length; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < gameState.currentState[i].length; j++) {
            let td = document.createElement('td')
            td.textContent = gameState.currentState[i][j]
            tr.appendChild(td)
        }
        grid.appendChild(tr)
    }
}

function SubmitMoves(){
    let userMoves= document.querySelector('#UserMoves').value
    fetch('http://localhost:5146/gameapi/' + userMoves, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameState)
    })
    .then(response => {DrawOutFromResp(response)})
}