const gameState = {
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
fetch('http://localhost:5146/gameapi/F,F,J', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameState)
})
.then(response => {DrawOutFromResp(response)})

async function DrawOutFromResp(answ){
    let grid = document.querySelector('#grid')
    let inpt = await answ.json()
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
