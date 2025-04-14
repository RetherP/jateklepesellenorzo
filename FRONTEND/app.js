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
document.querySelector("#UserMoves").hidden = true
document.querySelector("#UserMovesBtn").hidden = true
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
    let text = document.querySelector('#userIn').value;
    const charArray2D = text.trim().split('\n').map(line => line.trim().split(' '))
    if(UserSideGridValidation(charArray2D)){
        gameState.currentState = charArray2D
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
        document.querySelector("#UserMoves").hidden = false
        document.querySelector("#UserMovesBtn").hidden = false
        document.querySelector("#userIn").hidden = true
        document.querySelector("#userInBtn").hidden = true
    }
    else{
        alert("The Input array is invalid, there is an invalid character and/or the lenght of the lines are inconsistent.\n" 
        +"Make sure there are no empty spaces in the end of the lines")
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
function UserSideGridValidation(grid){
    if (!Array.isArray(grid)) {
        return false
    }
    const allowedChars = new Set(['B', 'P', 'C', '-']);
    const rowLength = grid[0].length;

    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        if (row.length !== rowLength) {
            return false
        }
        for (let j = 0; j < row.length; j++) {
            if (!allowedChars.has(row[j])) {
                return false
            }
        }
    }
  return true 
}   