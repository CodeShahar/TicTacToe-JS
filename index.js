let inputValues = []
let winningCombination = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]
]
let player1Name
let player2Name
const handleInputChange = (event, id) => {
    console.log(event.target.value)
    if (id == 'player1') player1Name = event.target.value
    else player2Name = event.target.value
}
const savePlayersName = () => {
    if (!player1Name || !player2Name) {
        return
    }
    let player1NameElement = document.getElementById('player1Name')
    let player2NameElement = document.getElementById('player2Name')

    switch (current) {
        case 1: {
            player1NameElement.textContent = player1Name + ' will play as X'
            player2NameElement.textContent = player2Name + ' will play as O'
            break;
        }
        case 2: {
            player1NameElement.textContent += player1Name + ' will play as O'
            player2NameElement.textContent += player2Name + ' will play as X'
            break;
        }
    }
    gridContainer.style.opacity = '1'
    gridContainer.style.pointerEvents = 'all'
    document.getElementById('profileContainer').style.display = 'none'
}
let winner = -1
const gridContainer = document.getElementById('grid-container');
gridContainer.style.opacity = '.1'
gridContainer.style.pointerEvents = 'none'
let intial = -1
let whoWillStart = Math.floor(Math.random() * 2);
let current = -1
if (whoWillStart == 1) {
    current = 1
    initial = 'X'
}
else {
    current = 2
    initial = 'O'
}



for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const gridItem = document.createElement('button');
        gridItem.classList.add('grid-item');
        // gridItem.textContent = `(${row }, ${col})`;
        gridItem.addEventListener('click', () => handleClick(3 * row + ((col + 1)), gridItem))
        gridContainer.appendChild(gridItem);
    }
}


let player1Moves = []
let player2Moves = []
let winnerElement = document.getElementById('winner')
let totalCount = 0


function handleClick(val, element) {
    ++totalCount
    if (current == 1) {
        if (initial == 'X')
            player1Moves.push(val)
        else
            player2Moves.push(val)
        element.textContent = 'X'
        current = 2
    }
    else {
        if (initial == 'O')
            player1Moves.push(val)
        else
            player2Moves.push(val)
        element.textContent = 'O'
        current = 1
    }
    for (let i = 0; i < winningCombination.length; i++) {
        if (isArraySubset(winningCombination[i], player1Moves)) {
            winner = 1
            console.log(winningCombination[i], player1Moves, 1);
            winnerElement.textContent = `WooHoo, the Winner is Player${winner}`
            gridContainer.style.pointerEvents = 'none'
            break;
        }
        if (isArraySubset(winningCombination[i], player2Moves)) {
            winner = 2
            console.log(winningCombination[i], player2Moves, 2);
            winnerElement.textContent = `WooHoo, the Winner is Player${winner}`
            gridContainer.style.pointerEvents = 'none'
            break;
        }
    }
    element.style.cursor = 'not-allowed'
    if (totalCount == 9 && winner == -1) {
        winnerElement.textContent = 'You both are smart, try some tricks to win'
    }

}

function isArraySubset(array1, array2) {
    return array1.every(element => array2.includes(element));
}