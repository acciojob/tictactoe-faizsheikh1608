
    const submitButton = document.getElementById('submit');
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let moves = 0;

    const winPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    submitButton.addEventListener('click', () => {
      player1Name = document.getElementById('player1').value || 'Player 1';
      player2Name = document.getElementById('player2').value || 'Player 2';

      if (!player1Name || !player2Name) {
        alert('Please enter names for both players!');
        return;
      }

      message.textContent = `${player1Name}, you're up!`;
      board.style.display = 'grid';
    });

    board.addEventListener('click', (event) => {
      if (!event.target.classList.contains('cell') || event.target.textContent) {
        return;
      }

      event.target.textContent = currentPlayer;
      moves++;

      const winner = checkWin(currentPlayer);
      if (winner) {
        message.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} congratulations you won!`;
        disableBoard();
      } else if (moves === 9) {
        message.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`;
      }
    });

    function checkWin(player) {
      const cells = [...document.querySelectorAll('.cell')];
      const playerCells = cells
        .filter((cell) => cell.textContent === player)
        .map((cell) => parseInt(cell.id));

      return winPatterns.some((pattern) =>
        pattern.every((cell) => playerCells.includes(cell))
      );
    }

    function disableBoard() {
      document.querySelectorAll('.cell').forEach((cell) => cell.classList.add('disabled'));
    }