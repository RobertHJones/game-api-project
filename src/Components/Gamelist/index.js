import React from "react";
import "./index.css";

export default function Gamelist({ text }) {
  return (
    <div className="game-display">
      {text.map((item) => {
        return (
          <div>
            <h3>{item.external}</h3>
            <img src={item.thumb} alt="" />
            <p>The current cheapest price is £{item.cheapest}</p>
          </div>
        );
      })}
    </div>
  );
}
