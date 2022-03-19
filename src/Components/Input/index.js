import React from "react";
import "./index.css";
import { useState } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

export default function Input({ onSubmit, onKeyPress }) {
  const [game, setGame] = useState("");

  function getValue(e) {
    // set the state by the user input
    setGame(e.target.value);
    console.log(game);
  }

  function searchGames(e) {
    // prevent the page from refreshing on search
    e.preventDefault();
    // pass the user's input to the fetch request
    onSubmit(game);
  }

  return (
    <form>
      <input
        className="gamesearch"
        onChange={getValue}
        placeholder="Search for a game"
      ></input>
      <Button type="primary" onClick={searchGames}>
        Find me a deal!
      </Button>
    </form>
  );
}
