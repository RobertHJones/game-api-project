import React from "react";
import "./index.css";
import { useState } from "react";

export default function Gamelist({ text }) {
  const [gameProperties, setGameProperties] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [saving, setSaving] = useState("");
  const [storeID, setStoreID] = useState("");
  const [store, setStore] = useState("");
  const [title, setTitle] = useState("");

  async function handleClick(e) {
    // console.log(e.target.id);
    let newId = e.target.id;

    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${newId}`
    );
    const data = await response.json();
    const array = data.deals.splice(0, 5);
    console.log(data.info.title);
    setGameProperties(array);
    setGamePrice(gameProperties[0].retailPrice);
    setCheapestPrice(gameProperties[0].price);
    setSaving(gameProperties[0].savings);
    setStoreID(array[0].storeID);
    setTitle(data.info.title);
    // console.log(storeID);
  }
  async function getStore() {
    const storeResponse = await fetch(
      `https://www.cheapshark.com/api/1.0/stores?id=1`
    );
    const storeData = await storeResponse.json();
    const theStore = storeData[storeID - 1];
    // console.log(theStore);
    setStore(theStore.storeName);
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
            {/* <p>The current cheapest price is £{item.cheapest}</p> */}
          </div>
        );
      })}
      <div>
        <p>Retail price: £{gamePrice}</p>
        <p>
          The current cheapest price for {title} is £{cheapestPrice} - you save{" "}
          {Math.ceil(saving)}%. Click <button onClick={getStore}>here</button>{" "}
          to unveil where to find this deal. {store}
        </p>
      </div>
    </div>
  );
}
