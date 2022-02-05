import React from "react";
import "./index.css";
import { useState } from "react";

export default function Gamelist({ text }) {
  const [gameProperties, setGameProperties] = useState("");

  async function handleClick(e) {
    console.log(e.target.id);
    let newId = e.target.id;

    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${newId}`
    );
  }

  return (
    <div className="game-display">
      {text.map((item) => {
        return (
          <div>
            <h3>{item.external}</h3>
            <img
              onClick={handleClick}
              src={item.thumb}
              alt=""
              id={item.gameID}
            />
            <p>The current cheapest price is £{item.cheapest}</p>
          </div>
        );
      })}
    </div>
  );
}
