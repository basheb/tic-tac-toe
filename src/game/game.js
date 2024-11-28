import "./game.css";

import { Link } from "react-router"; // Updated to "react-router-dom" for React Router v6
import { useState } from "react";

const Game = () => {
  // State variables
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("Player X's turn");
  const [humanRival, setHumanRival] = useState(true);
  const [opponentSelected, setOpponentSelected] = useState(false);

  // Handles cell clicks
  const handleCellClick = (index) => {
    if (gameOver || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(currentPlayer, newBoard)) {
      setGameState(`${currentPlayer} wins!`);
      setGameOver(true);
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setGameState("It's a draw!");
      setGameOver(true);
      return;
    }

    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);
    setGameState(`Player ${nextPlayer}'s turn`);

    if (!humanRival && nextPlayer === "O") {
      setTimeout(() => handleComputerMove(newBoard), 500); // Add slight delay for better UX
    }
  };

  // Handles computer move
  const handleComputerMove = (currentBoard) => {
    const emptyCells = currentBoard
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];

    const newBoard = [...currentBoard];
    newBoard[randomCell] = "O";
    setBoard(newBoard);

    if (checkWin("O", newBoard)) {
      setGameState("O wins!");
      setGameOver(true);
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setGameState("It's a draw!");
      setGameOver(true);
      return;
    }

    setCurrentPlayer("X");
    setGameState("Player X's turn");
  };

  // Checks for a win
  const checkWin = (player, boardState) => {
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
      pattern.every((index) => boardState[index] === player)
    );
  };

  // Resets the game
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameOver(false);
    setGameState("Player X's turn");
    setOpponentSelected(false);
    setHumanRival(true);
  };

  return (
    <div className="container">
      <Link className="link" id="back-button" to="/">
        Back
      </Link>
      <h1>Tic Tac Toe</h1>

      {!opponentSelected && (
        <div>
          <h2>Select your opponent:</h2>
          <div id="opponent-selection">
            <button
              onClick={() => {
                setHumanRival(true);
                setOpponentSelected(true);
                setGameOver(false);
              }}
            >
              Human
            </button>
            <button
              onClick={() => {
                setHumanRival(false);
                setOpponentSelected(true);
                setGameOver(false);
              }}
            >
              Computer
            </button>
          </div>
        </div>
      )}

      {opponentSelected && (
        <>
          <h2>{gameState}</h2>
          <div id="game-board">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell ? "occupied" : ""}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          <button id="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
