let gameState = {
    currentState: [
        ['-', '-', '-', '-', '-', '-', 'C'],
        ['-', 'C', '-', 'C', '-', 'B', '-'],
        ['B', '-', '-', 'B', '-', '-', '-'],
        ['-', '-', 'C', '-', 'B', '-', '-'],
        ['-', 'B', '-', 'B', '-', '-', 'C'],
        ['-', 'P', 'B', '-', 'B', 'B', '-'],
        ['-', 'B', 'B', '-', '-', '-', '-'],
        ['-', 'B', 'B', 'B', '-', 'B', 'C'],
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
            if(gameState.currentState[i][j] === "B"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/bomb_icon.png"
                td.appendChild(img)
            }
            else if(gameState.currentState[i][j] === "C"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/coin.png"
                td.appendChild(img)
            }
            else if(gameState.currentState[i][j] === "P"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/main_character.png"
                td.appendChild(img)
            }
            tr.appendChild(td)
        }
        grid.appendChild(tr)
    }}
    else{
        console.log(inpt.isInPlay)
        let body = document.querySelector('#body')
        body.innerHTML = ''
        let img = document.createElement('img')
        img.src = "/pics/bomb.png"
        img.classList.add("loser_bomb")
        body.appendChild(img)
    }
}
function FirstDrawout(){
    for (let i = 0; i < gameState.currentState.length; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < gameState.currentState[i].length; j++) {
            let td = document.createElement('td')
            if(gameState.currentState[i][j] === "B"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/bomb_icon.png"
                td.appendChild(img)
            }
            else if(gameState.currentState[i][j] === "C"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/coin.png"
                td.appendChild(img)
            }
            else if(gameState.currentState[i][j] === "P"){
                let img = document.createElement('img')
                img.classList.add('icon_img')
                img.src= "/pics/main_character.png"
                td.appendChild(img)
            }
            tr.appendChild(td)
        }
        grid.appendChild(tr)
    }
}

function SubmitMoves(){
    let userMoves= document.querySelector('#UserMoves').value
    if(IsInputValid(userMoves) === true){
        fetch('http://localhost:5146/gameapi/' + userMoves, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameState)
        })
        .then(response => {DrawOutFromResp(response)})
    }
    else {
        alert("Helytelen bemenet kérem adja meg bemeneti formátumnak megfelelően a lépéseket.")
    }
}
function IsInputValid(inpt){
    let splitted = inpt.toLowerCase().split(',')
    for (let i = 0; i < splitted.length; i++) {
        if(!(splitted[i] === "f" || splitted[i] === "j" || splitted[i] === "b" || splitted[i] === "l")){
            return false
        }        
    }
    return true
}