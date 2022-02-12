import React from "react";
import "./index.css";
import { useState } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

export default function Input({ onSubmit }) {
  const [game, setGame] = useState("");

  function getValue(e) {
    setGame(e.target.value);
    console.log(game);
  }

  function searchGames(e) {
    e.preventDefault();

    onSubmit(game);
  }

  function handleKeypress(e) {
    if (e.keyCode === 13) {
      searchGames();
    }
  }

  return (
    <form>
      <input
        className="gamesearch"
        onChange={getValue}
        placeholder="Search for a game"
        onKeyPress={handleKeypress}
      ></input>
      <Button type="primary" onClick={searchGames}>
        Find me a deal!
      </Button>
    </form>
  );
}
