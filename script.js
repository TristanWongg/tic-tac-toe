const createGameboard = () => {
    const boardArray = new Array(9).fill('');
    let div = document.querySelector('div');

    const displayGameboard = () => {
        let index = 0;
        boardArray.forEach(element => {
            let square = document.createElement('div');
            square.classList = 'square';
            square.dataset.index = index++;
            div.appendChild(square);
        });
    }
    
    const resetBoard = () => {
        boardArray.fill('');
        div.innerHTML = '';
    }
    
    displayGameboard();
    return{boardArray, resetBoard}
}

const Player = (num) => {
    const mark = (num === 1) ? 'X' : 'O';
    const name = `Player ${mark}`;
    return{name, mark};
};

const Game = () => {
    const p1 = Player(1);
    const p2 = Player(2);
    const gameboard = createGameboard();
    const gameboardArray = gameboard.boardArray;
    let turn = p1;
    let result = false;

    let squares = Array.from(document.getElementsByClassName('square'));
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.textContent === '' && result === false){
                if(turn === p1){
                    square.textContent = p1.mark;
                    gameboardArray[square.dataset.index] = p1.mark;
                    if(checkWinner(gameboardArray, p1)){
                        console.log(turn.name + " Wins!");
                        result = true;
                    }
                    turn = p2;
                }
                else{
                    square.textContent = p2.mark;
                    gameboardArray[square.dataset.index] = p2.mark;
                    if(checkWinner(gameboardArray, p2)){
                        console.log(turn.name + " Wins!");
                        result = true;
                    }
                    turn = p1;
                }
            }
            if (!result){
                if (gameboardArray.every(index => {return index !== '';})){
                    console.log("DRAW!");
                    result = true;
                }
            }
        });
    });
    document.querySelector('button').addEventListener('click', () => {
        gameboard.resetBoard();
        Game();
    });
}

function checkWinner(gameboardArray, player){
    const winCombos = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6],];
    
    return winCombos.some(combo => {
        return combo.every(index => {
            return gameboardArray[index] === player.mark;
        });
    });
}

Game();