const MISS_CLASS = 'miss'
const HIT_CLASS = 'hit'
const SHIP_CLASS = 'ship'
const HIDDEN_CLASS = 'hidden'
var numLives1Ship1 = 0
var numLives1Ship2 = 0
var numLives1Ship3 = 0
var numLives2Ship1 = 0
var numLives2Ship2 = 0
var numLives2Ship3 = 0
const cellElements = document.querySelectorAll('[data-cell]')
const board1 = document.getElementById('board1')
const board2 = document.getElementById('board2')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const changeTurnElement = document.getElementById('changeTurn')
const changeTurnButton = document.getElementById('ok')
const changeTurnMessage = document.querySelector('[change-turn-text]')
const p1s1 = document.querySelector('[p1s1]')
const p1s2 = document.querySelector('[p1s2]')
const p1s3 = document.querySelector('[p1s3]')
const p2s1 = document.querySelector('[p2s1]')
const p2s2 = document.querySelector('[p2s2]')
const p2s3 = document.querySelector('[p2s3]')

// 0 = empty no ship
// 1 = ship 1
// 2 = ship 2
// 3 = ship 3
// 4 = hit
// 5 = miss

let player1board = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]]
let player2board = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]]

let player1Turn

startGame()

restartButton.addEventListener('click', startGame)
changeTurnButton.addEventListener('click', swapTurns)


function startGame() {
    // set player1Turn to true
    // remove previous gamestate
    // remove and reapply event listener to placeShip
    // remove winning message
    // randomize shipboard placement
    player1Turn = true
    cellElements.forEach(cell => {
        cell.classList.remove(MISS_CLASS)
        cell.classList.remove(HIT_CLASS)
        cell.classList.remove(SHIP_CLASS)
        player1board = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]]
        player2board = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]]
        cell.removeEventListener('click', handleFire)
        cell.addEventListener('click', placeShip)
    })
    //placeShipsRandom()
    p1s1.innerText = 'Ship 1: Active'
    p1s2.innerText = 'Ship 2: Active'
    p1s3.innerText = 'Ship 3: Active'
    p2s1.innerText = 'Ship 1: Active'
    p2s2.innerText = 'Ship 2: Active'
    p2s3.innerText = 'Ship 3: Active'
    hideOpponentBoard()
    winningMessageElement.classList.remove('show')
}

function placeShip(e) {
    const cellClicked = e.target
    var cellIndex
    var i = 0
    for (i = 0; i < 128; i++) {
        if (cellElements[i] == cellClicked)
        cellIndex = i;
    }
    if (player1Turn == true) {
        if (numLives1Ship1 < 2) {
            if (numLives1Ship1 == 0) {
                cellClicked.classList.add(SHIP_CLASS)
                player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 1
                numLives1Ship1++
            } else if (numLives1Ship1 == 1) {
                if (player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 1 || player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 1 || player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 1 || player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 1) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 1
                    numLives1Ship1++
                }
            }
        } else if (numLives1Ship2 < 3) {
            if (numLives1Ship2 == 0) {
                if (player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 2
                    numLives1Ship2++
                 }
            } else if (numLives1Ship2 == 1) {
                if ((player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 2 || player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 2 || player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 2 || player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 2) && player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 2
                    numLives1Ship2++
                }
            } else if (numLives1Ship2 == 2) {
                if (((player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 2 && player1board[(cellIndex % 8)-2][Math.floor(cellIndex/8)] == 2) || (player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 2 && player1board[cellIndex % 8][Math.floor(cellIndex/8)-2] == 2) || (player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 2 && player1board[(cellIndex % 8)+2][Math.floor(cellIndex/8)] == 2) || (player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 2 && player1board[cellIndex % 8][Math.floor(cellIndex/8)+2] == 2)) && player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 2
                    numLives1Ship2++
                }
            }
        } else if (numLives1Ship3 < 4) {
            if (numLives1Ship3 == 0) {
                if (player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 3
                    numLives1Ship3++
                 }
            } else if (numLives1Ship3 == 1) {
                if ((player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 3 || player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 3 || player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 3 || player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 3) && player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 3
                    numLives1Ship3++
                }
            } else if (numLives1Ship3 == 2) {
                if (((player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)-2][Math.floor(cellIndex/8)] == 3) || (player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)-2] == 3) || (player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)+2][Math.floor(cellIndex/8)] == 3) || (player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)+2] == 3)) && player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 3
                    numLives1Ship3++
                }
            } else if (numLives1Ship3 == 3) {
                if (((player1board[Math.max(0, (cellIndex % 8)-1)][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)-2][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)-3][Math.floor(cellIndex/8)] == 3) || (player1board[cellIndex % 8][Math.max(0, Math.floor(cellIndex/8)-1)] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)-2] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)-3] == 3) || (player1board[Math.min(7, (cellIndex % 8)+1)][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)+2][Math.floor(cellIndex/8)] == 3 && player1board[(cellIndex % 8)+3][Math.floor(cellIndex/8)] == 3) || (player1board[cellIndex % 8][Math.floor(cellIndex/8)+1] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)+2] == 3 && player1board[cellIndex % 8][Math.floor(cellIndex/8)+3] == 3)) && player1board[cellIndex % 8][Math.floor(cellIndex/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 3
                    numLives1Ship3++
                    player1Turn = false
                    hideOpponentBoard()
                }
            }
        }
    } else if (player1Turn == false) {
        if (numLives2Ship1 < 2) {
            if (numLives2Ship1 == 0) {
                cellClicked.classList.add(SHIP_CLASS)
                player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 1
                numLives2Ship1++
            } else if (numLives2Ship1 == 1) {
                if (player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 1 || player2board[(cellIndex-64) % 8][Math.max(0, Math.floor((cellIndex-64)/8)-1)] == 1 || player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 1 || player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 1) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 1
                    numLives2Ship1++
                }
            }
        } else if (numLives2Ship2 < 3) {
            if (numLives2Ship2 == 0) {
                if (player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 2
                    numLives2Ship2++
                 }
            } else if (numLives2Ship2 == 1) {
                if ((player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 2 || player2board[(cellIndex-64) % 8][Math.max(0,Math.floor((cellIndex-64)/8)-1)] == 2 || player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 2 || player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 2) && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 2
                    numLives2Ship2++
                }
            } else if (numLives2Ship2 == 2) {
                if (((player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 2 && player2board[((cellIndex-64) % 8)-2][Math.floor((cellIndex-64)/8)] == 2) || (player2board[(cellIndex-64) % 8][Math.max(0,Math.floor((cellIndex-64)/8)-1)] == 2 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)-2] == 2) || (player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 2 && player2board[((cellIndex-64) % 8)+2][Math.floor((cellIndex-64)/8)] == 2) || (player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 2 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+2] == 2)) && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 2
                    numLives2Ship2++
                }
            }
        } else if (numLives2Ship3 < 4) {
            if (numLives2Ship3 == 0) {
                if (player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 3
                    numLives2Ship3++
                 }
            } else if (numLives2Ship3 == 1) {
                if ((player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 3 || player2board[(cellIndex-64) % 8][Math.max(0,Math.floor((cellIndex-64)/8)-1)] == 3 || player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 3 || player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 3) && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 3
                    numLives2Ship3++
                }
            } else if (numLives2Ship3 == 2) {
                if (((player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)-2][Math.floor((cellIndex-64)/8)] == 3) || (player2board[(cellIndex-64) % 8][Math.max(0,Math.floor((cellIndex-64)/8)-1)] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)-2] == 3) || (player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)+2][Math.floor((cellIndex-64)/8)] == 3) || (player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+2] == 3)) && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 3
                    numLives2Ship3++
                }
            } else if (numLives2Ship3 == 3) {
                if (((player2board[Math.max(0, ((cellIndex-64) % 8)-1)][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)-2][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)-3][Math.floor((cellIndex-64)/8)] == 3) || (player2board[(cellIndex-64) % 8][Math.max(0,Math.floor((cellIndex-64)/8)-1)] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)-2] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)-3] == 3) || (player2board[Math.min(7, ((cellIndex-64) % 8)+1)][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)+2][Math.floor((cellIndex-64)/8)] == 3 && player2board[((cellIndex-64) % 8)+3][Math.floor((cellIndex-64)/8)] == 3) || (player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+1] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+2] == 3 && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)+3] == 3)) && player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] == 0) {
                    cellClicked.classList.add(SHIP_CLASS)
                    player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 3
                    numLives2Ship3++
                    cellElements.forEach(cell => {
                        cell.removeEventListener('click', placeShip)
                        cell.addEventListener('click', handleFire)
                    })
                    player1Turn = true
                    hideOpponentBoard()
                }
            }
        }
    }
}

function handleFire(e) {
    // if array is 1/2/3 assign hit class
    // else assign miss
    // check for win
    // switch turns
    const cellClicked = e.target
    var cellIndex
    var i = 0
    var temp
    cellClicked.classList.remove(HIDDEN_CLASS)
    for (i = 0; i < 128; i++) {
        if (cellElements[i] == cellClicked)
        cellIndex = i;
    }

    if (player1Turn == false) {
        temp = player1board[cellIndex % 8][Math.floor(cellIndex/8)]
        if (temp == 1 || temp == 2 || temp == 3) {
            cellClicked.classList.remove(SHIP_CLASS)
            cellClicked.classList.add(HIT_CLASS)
            player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 4
            if (temp == 1) {
                numLives1Ship1--;
            }
            if (temp == 2) {
                numLives1Ship2--;
            }
            if (temp == 3) {
                numLives1Ship3--;
            }
        } else {
            cellClicked.classList.add(MISS_CLASS)
            player1board[cellIndex % 8][Math.floor(cellIndex/8)] = 5
        } 
    }
    
    if (player1Turn == true) {
        temp = player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)]
        if (temp == 1 || temp == 2 || temp == 3) {
            cellClicked.classList.remove(SHIP_CLASS)
            cellClicked.classList.add(HIT_CLASS)
            player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 4
            if (temp == 1) {
                numLives2Ship1--;
            }
            if (temp == 2) {
                numLives2Ship2--;
            }
            if (temp == 3) {
                numLives2Ship3--;
            }
        } else {
            cellClicked.classList.add(MISS_CLASS)
            player2board[(cellIndex-64) % 8][Math.floor((cellIndex-64)/8)] = 5
        }
    }
    checkSink(player1Turn, temp)
    checkWin(player1Turn)
    changeTurnElement.classList.add('show')
}

function checkSink(turn, temp) {
    if (turn == false) {
        if (temp == 1) {
            if (numLives1Ship1 == 0) {
                //"sunk player 1 ship 1"
                p1s1.innerText = 'Ship 1: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 1! Pass device to Player 1'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 1'
            }
        } else if (temp == 2) {
            if (numLives1Ship2 == 0) {
                //"sunk player 1 ship 2"
                p1s2.innerText = 'Ship 2: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 2! Pass device to Player 1'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 1'
            }
        } else if (temp == 3) {
            if (numLives1Ship3 == 0) {
                //"sunk player 1 ship 3"
                p1s3.innerText = 'Ship 3: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 3! Pass device to Player 1'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 1'
            }
        } else {
            changeTurnMessage.innerText = 'Miss... Pass device to Player 1'
        }
    }
    if (turn == true) {
        if (temp == 1) {
            if (numLives2Ship1 == 0) {
                //"sunk player 2 ship 1"
                p2s1.innerText = 'Ship 1: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 1! Pass device to Player 2'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 2'
            }
        } else if (temp == 2) {
            if (numLives2Ship2 == 0) {
                p2s2.innerText = 'Ship 2: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 2! Pass device to Player 2'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 2'
            }
        } else if (temp == 3) {
            if (numLives2Ship3 == 0) {
                p2s3.innerText = 'Ship 3: Sunk'
                changeTurnMessage.innerText = 'Sunk ship 3! Pass device to Player 2'
            } else {
                changeTurnMessage.innerText = 'Hit! Pass device to Player 2'
            }
        } else {
            changeTurnMessage.innerText = 'Miss... Pass device to Player 2'
        }
    }
}

function checkWin(turn) {
    if (turn == false) {
        if (numLives1Ship1 + numLives1Ship2 + numLives1Ship3 == 0) {
            winningMessageTextElement.innerText = 'Player 2 Wins!'
            winningMessageElement.classList.add('show')
        }
    }
    if (turn == true) {
        if (numLives2Ship1 + numLives2Ship2 + numLives2Ship3 == 0) {
            winningMessageTextElement.innerText = 'Player 1 Wins!'
            winningMessageElement.classList.add('show')
        }
    }
}

function placeShipsRandom() { // places ships randomly; currently unused
    //place ship 1: 2 spots
    //place ship 2: 3 spots
    //place ship 3: 4 spots
    //change array values
    // steps: 1. determine horizontal/vertical 2. determine first pos 3. bounds checking 4. apply ship class to cell
    // horizontal = 0, vertical = 1
    var alignment = 0
    var xpos = 0
    var ypos = 0
    var ship1placed = 0
    var ship2placed = 0
    var ship3placed = 0
    while (ship1placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 1 <= 7) {
                player1board[xpos][ypos] = 1
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos+1][ypos] = 1
                cellElements[(8 * ypos) + xpos + 1].classList.add(SHIP_CLASS)
                ship1placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 1 <= 7) {
                player1board[xpos][ypos] = 1
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+1] = 1
                cellElements[(8 * (ypos+1)) + xpos].classList.add(SHIP_CLASS)
                ship1placed = 1
            }
        }
    }
    while (ship2placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 2 <= 7 && player1board[xpos][ypos] == 0 && player1board[xpos+1][ypos] == 0 && player1board[xpos+2][ypos] == 0) {
                player1board[xpos][ypos] = 2
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos+1][ypos] = 2
                cellElements[(8 * ypos) + xpos + 1].classList.add(SHIP_CLASS)
                player1board[xpos+2][ypos] = 2
                cellElements[(8 * ypos) + xpos + 2].classList.add(SHIP_CLASS)
                ship2placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 2 <= 7 && player1board[xpos][ypos] == 0 && player1board[xpos][ypos+1] == 0 && player1board[xpos][ypos+2] == 0) {
                player1board[xpos][ypos] = 2
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+1] = 2
                cellElements[(8 * (ypos+1)) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+2] = 2
                cellElements[(8 * (ypos+2)) + xpos].classList.add(SHIP_CLASS)
                ship2placed = 1
            }
        }
    }
    while (ship3placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 3 <= 7 && player1board[xpos][ypos] == 0 && player1board[xpos+1][ypos] == 0 && player1board[xpos+2][ypos] == 0 && player1board[xpos+3][ypos] == 0) {
                player1board[xpos][ypos] = 3
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos+1][ypos] = 3
                cellElements[(8 * ypos) + xpos + 1].classList.add(SHIP_CLASS)
                player1board[xpos+2][ypos] = 3
                cellElements[(8 * ypos) + xpos + 2].classList.add(SHIP_CLASS)
                player1board[xpos+3][ypos] = 3
                cellElements[(8 * ypos) + xpos + 3].classList.add(SHIP_CLASS)
                ship3placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 3 <= 7 && player1board[xpos][ypos] == 0 && player1board[xpos][ypos+1] == 0 && player1board[xpos][ypos+2] == 0 && player1board[xpos][ypos+3] == 0) {
                player1board[xpos][ypos] = 3
                cellElements[(8 * ypos) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+1] = 3
                cellElements[(8 * (ypos+1)) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+2] = 3
                cellElements[(8 * (ypos+2)) + xpos].classList.add(SHIP_CLASS)
                player1board[xpos][ypos+3] = 3
                cellElements[(8 * (ypos+3)) + xpos].classList.add(SHIP_CLASS)
                ship3placed = 1
            }
        }
    }
    ship1placed = 0
    ship2placed = 0
    ship3placed = 0
    while (ship1placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 1 <= 7) {
                player2board[xpos][ypos] = 1
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos+1][ypos] = 1
                cellElements[(8 * ypos) + xpos + 1 + 64].classList.add(SHIP_CLASS)
                ship1placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 1 <= 7) {
                player2board[xpos][ypos] = 1
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+1] = 1
                cellElements[(8 * (ypos+1)) + xpos + 64].classList.add(SHIP_CLASS)
                ship1placed = 1
            }
        }
    }
    while (ship2placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 2 <= 7 && player2board[xpos][ypos] == 0 && player2board[xpos+1][ypos] == 0 && player2board[xpos+2][ypos] == 0) {
                player2board[xpos][ypos] = 2
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos+1][ypos] = 2
                cellElements[(8 * ypos) + xpos + 1 + 64].classList.add(SHIP_CLASS)
                player2board[xpos+2][ypos] = 2
                cellElements[(8 * ypos) + xpos + 2 + 64].classList.add(SHIP_CLASS)
                ship2placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 2 <= 7 && player2board[xpos][ypos] == 0 && player2board[xpos][ypos+1] == 0 && player2board[xpos][ypos+2] == 0) {
                player2board[xpos][ypos] = 2
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+1] = 2
                cellElements[(8 * (ypos+1)) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+2] = 2
                cellElements[(8 * (ypos+2)) + xpos + 64].classList.add(SHIP_CLASS)
                ship2placed = 1
            }
        }
    }
    while (ship3placed == 0) {
        alignment = Math.floor(Math.random() * 2)
        xpos = Math.floor(Math.random() * 8)
        ypos = Math.floor(Math.random() * 8)
        if (alignment == 0) {
            if (xpos + 3 <= 7 && player2board[xpos][ypos] == 0 && player2board[xpos+1][ypos] == 0 && player2board[xpos+2][ypos] == 0 && player2board[xpos+3][ypos] == 0) {
                player2board[xpos][ypos] = 3
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos+1][ypos] = 3
                cellElements[(8 * ypos) + xpos + 1 + 64].classList.add(SHIP_CLASS)
                player2board[xpos+2][ypos] = 3
                cellElements[(8 * ypos) + xpos + 2 + 64].classList.add(SHIP_CLASS)
                player2board[xpos+3][ypos] = 3
                cellElements[(8 * ypos) + xpos + 3 + 64].classList.add(SHIP_CLASS)
                ship3placed = 1
            }
        } else if (alignment == 1) {
            if (ypos + 3 <= 7 && player2board[xpos][ypos] == 0 && player2board[xpos][ypos+1] == 0 && player2board[xpos][ypos+2] == 0 && player2board[xpos][ypos+3] == 0) {
                player2board[xpos][ypos] = 3
                cellElements[(8 * ypos) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+1] = 3
                cellElements[(8 * (ypos+1)) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+2] = 3
                cellElements[(8 * (ypos+2)) + xpos + 64].classList.add(SHIP_CLASS)
                player2board[xpos][ypos+3] = 3
                cellElements[(8 * (ypos+3)) + xpos + 64].classList.add(SHIP_CLASS)
                ship3placed = 1
            }
        }
    }
}

function swapTurns() {
    player1Turn = !player1Turn
    hideOpponentBoard()
    changeTurnElement.classList.remove('show')
}

function hideOpponentBoard() {
    var i
    var j

    if (player1Turn == true) {
        for(i = 0; i < 8; i++) {
            for(j = 0; j < 8; j++) {
                if (player2board[i][j] == 0 || player2board[i][j] == 1 || player2board [i][j] == 2 || player2board[i][j] == 3) {
                    cellElements[(8 * j) + i + 64].classList.remove(SHIP_CLASS)
                    cellElements[(8 * j) + i + 64].classList.add(HIDDEN_CLASS)
                }
                cellElements[(8 * j) + i].classList.remove(HIDDEN_CLASS)
                if (player1board[i][j] == 1 || player1board[i][j] == 2 || player1board[i][j] == 3) {
                    cellElements[(8 * j) + i].classList.add(SHIP_CLASS)
                }  
                if (player1board[i][j] == 4) {
                    cellElements[(8 * j) + i].classList.add(HIT_CLASS)
                }
                if (player1board[i][j] == 5) {
                    cellElements[(8 * j) + i].classList.add(MISS_CLASS)
                }
            }
        }
    }

    if (player1Turn == false) {
        for(i = 0; i < 8; i++) {
            for(j = 0; j < 8; j++) {
                if (player1board[i][j] == 0 || player1board[i][j] == 1 || player1board [i][j] == 2 || player1board[i][j] == 3) {
                    cellElements[(8 * j) + i].classList.remove(SHIP_CLASS)
                    cellElements[(8 * j) + i].classList.add(HIDDEN_CLASS)
                } 
                cellElements[(8 * j) + i + 64].classList.remove(HIDDEN_CLASS)
                if (player2board[i][j] == 1 || player2board[i][j] == 2 || player2board[i][j] == 3) {
                    cellElements[(8 * j) + i + 64].classList.add(SHIP_CLASS)
                }
                if (player2board[i][j] == 4) {
                    cellElements[(8 * j) + i + 64].classList.add(HIT_CLASS)
                }
                if (player2board[i][j] == 5) {
                    cellElements[(8 * j) + i + 64].classList.add(MISS_CLASS)
                }
            }
        }
    } 
}
