// Start Interface
const startInterface = (() => {
    const startButton = document.getElementById('startButton');
    const firstPlayer = document.getElementById('player1');
    const secondPlayer = document.getElementById('player2');
    const statusMessage = document.getElementById('game-statusDisplay');
    const startScreen = document.getElementById('startScreenContainer');
    const gameScreen = document.getElementById('game-container');

    startButton.addEventListener('click', () => {
        startScreen.style.display = "none";
        gameScreen.style.display = "flex";
        statusMessage.innerHTML = `${firstPlayer.value}'s turn`
    })
})();

// Gameboard
const gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const checkMove = (row, col, marker) => {
        if (board[row][col] === '') {
            board[row][col] = marker;
            return true;
        }
        return false;
    }

    return {board, checkMove}
})();

// Players
const player = (name, marker) => {
    return {name, marker}
}

player1 = player()