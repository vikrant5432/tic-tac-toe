import { useState } from "react";
import Players from "./components/Players/Players";
import GameBoard from "./components/Game-Board/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/Game-over/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const drivedActivePlayer = (gameTurn) => {
  let activePlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
};

const deriveWinner = (gameBoard, players) => {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      return players[firstSquare];
    }
  }
};

const driveGameBoard = (gameTurn) => {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  // Derived state
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const App = () => {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = drivedActivePlayer(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const gameBoard = driveGameBoard(gameTurn);
  const hasDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevGameTurn) => {
      const currentPlayer = drivedActivePlayer(prevGameTurn);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      return updatedTurn;
    });
  };

  const handleReMatch = () => {
    setGameTurn([]);
  };

  const handlePlayerChanges = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            name={"Player 1"}
            symbol={"X"}
            isPlayerActive={activePlayer === "X"}
            onChangeName={handlePlayerChanges}
          />
          <Players
            name={"Player 2"}
            symbol={"O"}
            isPlayerActive={activePlayer === "O"}
            onChangeName={handlePlayerChanges}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleReMatch={handleReMatch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
};

export default App;
