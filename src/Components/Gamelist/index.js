import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

export default function Gamelist({ text }) {
  const [gameProperties, setGameProperties] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [saving, setSaving] = useState("");
  const [storeID, setStoreID] = useState("");
  const [store, setStore] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [storeLink2, setStoreLink2] = useState("");

  async function handleClick(e) {
    // console.log(e.target.id);
    let newId = e.target.id;

    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${newId}`
    );
    const data = await response.json();
    const array = data.deals.splice(0, 5);
    console.log(array[0].dealID);
    setGameProperties(array);
    setGamePrice(`Retail price: £${array[0].retailPrice}`);
    setCheapestPrice(" is £" + array[0].price);
    setSaving(` - you save ${Math.round(array[0].savings)}%.`);
    setStoreID(array[0].storeID);
    setTitle("The current cheapest price for " + data.info.title);
    setStore("");
    setStoreLink("");
    setStoreLink2("");
    setLink(`https://www.cheapshark.com/redirect?dealID=${array[0].dealID}`);
    setLink2(`https://www.cheapshark.com/redirect?dealID=${array[1].dealID}`);
    console.log(link);
  }
  async function getStore() {
    const storeResponse = await fetch(
      `https://www.cheapshark.com/api/1.0/stores?id=1`
    );
    const storeData = await storeResponse.json();
    const theStore = storeData[storeID - 1];
    // console.log(storeData);
    setStore(
      `Find this deal at ${theStore.storeName}. Alternatively you could try ${
        storeData[storeID].storeName
      } where it costs £${gameProperties[1].price} - a saving of ${Math.round(
        gameProperties[1].savings
      )}%.`
    );
    setStoreLink(theStore.storeName + " deal");
    setStoreLink2(storeData[storeID].storeName + " deal");
  }

  useEffect(() => {
    setStore("");
    setGamePrice("");
    setCheapestPrice("");
    setTitle("");
    setSaving("");
    setStoreLink("");
    setStoreLink2("");
  }, [text]);

  return (
    <div className="game-display">
      {text.map((item) => {
        return (
          <div>
            <h3 className="title">{item.external}</h3>
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
      <div className="gameinfo">
        <h3 className="price">{gamePrice}</h3>
        <p>
          {title}
          {cheapestPrice}
          {saving}
        </p>
        <p>
          Click on the image to select your game and then click{" "}
          <Button type="primary" id="storebutton" onClick={getStore}>
            here
          </Button>{" "}
          to unveil where to find this deal.
        </p>
        <p>{store}</p>
        <ul>
          <li>
            <a target="_blank" rel="noreferrer" href={link}>
              {storeLink}
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href={link2}>
              {" "}
              {storeLink2}
            </a>
          </li>
        </ul>
        <p></p>
      </div>
    </div>
  );
}
