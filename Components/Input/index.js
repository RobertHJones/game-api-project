import React from "react";
import "./index.css";
import { useState } from "react";

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

  return (
    <form>
      <input onChange={getValue} placeholder="Search for a game"></input>
      <button onClick={searchGames}>Find me a deal!</button>
    </form>
  );
}
