
const gameState = {
    currentState: [
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', 'C', '-', '-', '-'],
        ['-', '-', '-', 'H', '-', '-', '-'],
        ['-', '-', 'C', '-', 'H', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['▌', '-', 'H', '-', '-', '-', '-'],
        ['-', 'H', 'H', '-', '-', '-', '-'],
        ['-', 'H', 'H', 'H', '-', '-', '-'],
        ['-', '-', 'H', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-']
    ],
    isInPlay: true,
    numOfCoins: 0
};
fetch('http://localhost:5146/GameApi/F,L,J', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameState)
})
.then(response => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
})
.then(updatedGame => {
    console.log("Game updated:", updatedGame);
    // you can now update the UI with updatedGame
})
.catch(error => {
    console.error("Error during move validation:", error);
});
