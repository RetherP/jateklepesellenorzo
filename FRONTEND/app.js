
const gameState = {
    currentState: [
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'C', '-', '-', '-'],
        ['-', '-', '-', '¤', '-', '-', '-'],
        ['-', '-', 'C', '-', '¤', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['█', '-', '¤', '-', '-', '-', '-'],
        ['-', '¤', '¤', '-', '-', '-', '-'],
        ['-', '¤', '¤', '¤', '-', '-', '-'],
        ['-', '-', '¤', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-']
    ],
    numOfCoins: 0,
    isInPlay: true
};
fetch('http://localhost:5146/gameapi/F,J,F', {
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
