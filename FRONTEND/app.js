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
// fetch('http://localhost:5146/gameapi/F,F,J', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(gameState)
// })
// .then(response => {DrawOutFromResp(response)})

async function DrawOutFromResp(answ){
    let grid = document.querySelector('#grid')
    grid.innerHTML = ''
    let inpt = await answ.json()
    gameState.currentState = inpt.currentState
    gameState.isInPlay = inpt.isInPlay
    gameState.numOfCoins = inpt.numOfCoins
    for (let i = 0; i < inpt.currentState.length; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < inpt.currentState[i].length; j++) {
            let td = document.createElement('td')
            td.textContent = inpt.currentState[i][j]
            tr.appendChild(td)
        }
        grid.appendChild(tr)
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