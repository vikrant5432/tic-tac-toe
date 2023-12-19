/* eslint-disable react/prop-types */
import { useState } from "react";

const Players = ({ name, symbol, isPlayerActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const editPlayerName = () => {
    //* Reasion why we should be passing function to change state using previous state is because REACT schedule the change for state and it doesn't happen immediately. So if we want to change state based on previous state, we should be passing function to change state using previous state.
    // setIsEditing(!isEditing);

    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  // Two ways binding
  const savePlayerName = (event) => {
    setPlayerName(event.target.value);
    // setIsEditing((editing) => !editing);
  };
  return (
    <li className={isPlayerActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            required
            value={playerName}
            onChange={savePlayerName}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editPlayerName}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
};

export default Players;
