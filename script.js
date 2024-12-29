//your JS code here. If required.
const initialView = document.getElementById('initial-view');
    const gameView = document.getElementById('game-view');
    const messageDiv = document.getElementById('message');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer = 'x';
    let player1 = '';
    let player2 = '';

    const winningCombinations = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7]
    ];

    function checkWinner() {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          cells[a - 1].textContent === currentPlayer &&
          cells[b - 1].textContent === currentPlayer &&
          cells[c - 1].textContent === currentPlayer
        ) {
          return true;
        }
      }
      return false;
    }

    function checkDraw() {
      return Array.from(cells).every(cell => cell.textContent);
    }

    function handleClick(event) {
      const cell = event.target;
      if (cell.textContent) return;

      cell.textContent = currentPlayer;

      if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2}, congratulations you won!`;
        board.removeEventListener('click', handleClick);
      } else if (checkDraw()) {
        messageDiv.textContent = `It's a draw!`;
      } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2}, you're up!`;
      }
    }

    document.getElementById('submit').addEventListener('click', () => {
      player1 = document.getElementById('player1').value || 'Player 1';
      player2 = document.getElementById('player2').value || 'Player 2';

      if (!player1 || !player2) {
        alert('Please enter names for both players!');
        return;
      }

      initialView.style.display = 'none';
      gameView.style.display = 'block';
      messageDiv.textContent = `${player1}, you're up!`;
    });

    board.addEventListener('click', handleClick);