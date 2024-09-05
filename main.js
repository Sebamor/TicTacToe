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
        statusMessage.innerHTML = `${firstPlayer.value}'s turn`;
    })

    return {firstPlayer, secondPlayer}
})();

// Gameboard
const gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const getCurrentBoard = () => board;

    const checkMove = (row, col, marker) => {
        if (board[row][col] === '') {
            board[row][col] = marker;
            return true;
        } else {
            return false;
        }
    }

    return {getCurrentBoard, checkMove}
})();

// Players
const player = (name, marker) => {
    return {name, marker}
}

const player1 = player(startInterface.firstPlayer.value, 'X');
const player2 = player(startInterface.secondPlayer.value, 'O');

// Game Function
const gameFunction = (() => {
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinCondition = (board, marker) => {
        const winConditions = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ]

        return (
            winConditions.some(
                conditions => conditions.every(square => square === marker)
            )
        );
    }

    const checkDraw = board => board.every(
        row => row.every(square => square !== '')
    );

    return {switchPlayer, checkWinCondition, checkDraw}
})();

// Game Interface
const gameInterface = (() => {
    const gameboardSquares = document.querySelectorAll(".gameboard-square")
    const firstPlayer = document.getElementById('player1');
    const secondPlayer = document.getElementById('player2');
    const statusMessage = document.getElementById('game-statusDisplay');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = player1;
    let isGameOver = false;

    const showWinMessage = (name) => {
        statusMessage.innerHTML = `${name} wins!`;
        isGameOver = true;
    }

    const showDrawMessage = () => {
        statusMessage.innerHTML = "It's a draw, try again.";
        isGameOver = true;
    }

    const getRowCol = (index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return [row, col];
    }

    const updateGame = () => {
        const currentPlayerDisplay =  currentPlayer === player1 ? firstPlayer : secondPlayer;
        statusMessage.innerHTML = `${currentPlayerDisplay.value}'s turn`;

        gameboardSquares.forEach((square, index) => {
            square.setAttribute('data-index', index);
            const [row, col] = getRowCol(index);
            const marker = gameboard.getCurrentBoard()[row][col];
            square.innerHTML = marker;

            square.addEventListener('click', () => {
                if(!isGameOver) {
                    const [clickRow, clickCol] = getRowCol(index);

                    if(gameboard.checkMove(clickRow, clickCol, currentPlayer.marker)) {
                        square.innerHTML = currentPlayer.marker;
                        
                        if(gameFunction.checkWinCondition(gameboard.getCurrentBoard(), currentPlayer.marker)) {
                            showWinMessage(currentPlayer.name);
                        } else if(gameFunction.checkDraw(gameboard.getCurrentBoard())) {
                            showDrawMessage();
                        } else {
                            currentPlayer = currentPlayer === player1 ? player2 : player1;
                            updateGame();
                        }
                    }
                }
            })
        })

        const resetBoard = () => {
            let board = gameboard.getCurrentBoard();
            for(let i = 0; i < board.length; i++) {
                for(let j = 0; j < board[i].length; j++) {
                    board[i][j] = '';
                }
            }
            currentPlayer = player1;
            isGameOver = false;
            updateGame();
        }
    
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
    }

    return {updateGame};
})();

gameInterface.updateGame();