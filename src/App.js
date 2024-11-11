import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState();
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    generateBoard(3);
  }, []);

  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(null);
      }
      board.push(row);
    }
    setBoard(board);
    setWinner(null);
  };

  const checkWinner = (newBoard) => {
    // horizontal win
    for (let i = 0; i < newBoard.length; i++) {
      const row = newBoard[i];
      const sum = row.reduce((sum, v) => sum + v, 0);
      console.log(sum);
      if (sum === newBoard.length) {
        return setWinner(1);
      } else if (sum === newBoard.length * -1) {
        return setWinner(-1);
      }
    }

    // vertical win
    for (let j = 0; j < newBoard.length; j++) {
      let sum = 0;
      for (let i = 0; i < newBoard.length; i++) {
        sum += newBoard[i][j];
      }

      if (sum === newBoard.length) {
        return setWinner(1);
      } else if (sum === newBoard.length * -1) {
        return setWinner(-1);
      }
    }

    let vertSum1 = 0;
    for (let i = 0; i < newBoard.length; i++) {
      vertSum1 += newBoard[i][i];
    }
    if (vertSum1 === newBoard.length) {
      return setWinner(1);
    } else if (vertSum1 === newBoard.length * -1) {
      return setWinner(-1);
    }

    let vertSum2 = 0;
    for (let i = 0; i < newBoard.length; i++) {
      vertSum2 += newBoard[i][newBoard.length - i - 1];
    }
    if (vertSum2 === newBoard.length) {
      return setWinner(1);
    } else if (vertSum1 === newBoard.length * -1) {
      return setWinner(-1);
    }
  };

  const getUserPlayHandler = (row, column) => {
    return () => {
      if (winner) return;

      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[row][column] = player;
      setBoard(newBoard);
      setPlayer(player === 1 ? -1 : 1);
      checkWinner(newBoard);
    };
  };

  const renderBoard = () => {
    const rendered = [];
    board.forEach((row, i) => {
      row.map((cell, j) => {
        rendered.push(
          <Square
            key={`${i},${j}`}
            value={cell}
            onClick={getUserPlayHandler(i, j)}
          />
        );
      });
    });
    return rendered;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "1em",
        gap: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{}}>
        <label>
          Size
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <button type="button" onClick={generateBoard}>
            New Game
          </button>
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board?.length || 1}, 1fr)`,
        }}
      >
        {board ? renderBoard() : null}
      </div>
      {winner !== null && (
        <div>{winner === 1 ? "Player 1" : "Player 2"} is the winner!</div>
      )}
    </div>
  );
}

function Square({ onClick, value }) {
  const style = {
    width: 64,
    height: 64,
    fontSize: "2em",
    background: "none",
    border: "1px solid black",
    borderRadius: 2,
    margin: -0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (value === null)
    return (
      <button
        style={{
          ...style,
        }}
        onClick={onClick}
      >
        -
      </button>
    );
  return <div style={{ ...style }}>{value === 1 ? "X" : "O"}</div>;
}

export default App;
