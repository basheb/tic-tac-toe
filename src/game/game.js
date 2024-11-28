import "./game.css";

import { Link } from "react-router";
import { useState } from "react";

const Game = () => {
  // Set the board, player, and game state
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("Player X's turn");

  const handleCellClick = (index) => {
    if (gameOver || board[index] !== "") return;

    board[index] = currentPlayer;
    setBoard([...board]);

    if (checkWin()) {
      setGameState(`${currentPlayer} wins!`);
      setGameOver(true);
    } else if (board.every((cell) => cell !== "")) {
      setGameState("It's a draw!");
      setGameOver(true);
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setGameState(`Player ${nextPlayer}'s turn`);
    }
  };

  const checkWin = () => {
    // In the game of Tic Tac Toe, there are 8 possible ways to win
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === currentPlayer)
    );
  };

  var resetGame = function () {
    const newBoard = Array(9).fill("");
    setBoard(newBoard);
    setCurrentPlayer("X");
    setGameOver(false);
    setGameState("Player X's turn");
  };

  return (
    <div class="container">
      <Link className="link" id="back-button" to="/">
        Back
      </Link>
      <h1>Tic Tac Toe</h1>

      <h2>{gameState}</h2>
      <div id="game-board">
        {board.map((cell, index) => (
          <div class="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default Game;
