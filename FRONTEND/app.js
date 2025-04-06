
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
.then(response => {
    //console.log("Response: ", response)
    let resp = response.json()
    console.log(resp)
})
