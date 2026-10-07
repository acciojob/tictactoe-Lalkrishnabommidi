//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submit = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1;
let player2;
let currentPlayer = 1;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

submit.addEventListener("click", function () {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    return;
  }

  playerForm.style.display = "none";
  game.style.display = "block";

  message.textContent = `${player1}, you're up`;
});

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    const id = Number(cell.id);

    if (board[id] !== "") {
      return;
    }

    if (currentPlayer === 1) {
      board[id] = "x";
      cell.textContent = "x";
    } else {
      board[id] = "o";
      cell.textContent = "o";
    }

    if (checkWinner()) {
      const winner = currentPlayer === 1 ? player1 : player2;
      message.textContent = `${winner} congratulations you won!`;
      cells.forEach((cell) => {
        cell.style.pointerEvents = "none";
      });
      return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    if (currentPlayer === 1) {
      message.textContent = `${player1}, you're up`;
    } else {
      message.textContent = `${player2}, you're up`;
    }
  });
});

function checkWinner() {
  return winningCombinations.some(function (combination) {
    const [a, b, c] = combination;

    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}