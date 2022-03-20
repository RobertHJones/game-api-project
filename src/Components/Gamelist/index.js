import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";

export default function Gamelist({ text, error }) {
  const [gameProperties, setGameProperties] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [saving, setSaving] = useState("");
  const [storeID, setStoreID] = useState("");
  const [store, setStore] = useState("");
  const [store2, setStore2] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [storeLink2, setStoreLink2] = useState("");

  async function handleClick(e) {
    // take the id from the image
    let newId = e.target.id;
    // make a new fetch request using this id to retrieve more detailed information from API
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${newId}`
    );
    const data = await response.json();
    // use the first five deals
    const array = data.deals.splice(0, 5);
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
    console.log(link);
    setLink2(`https://www.cheapshark.com/redirect?dealID=${array[1].dealID}`);
    // console.log(array);
  }
  async function getStore() {
    const storeResponse = await fetch(
      `https://www.cheapshark.com/api/1.0/stores?id=1`
    );
    const storeData = await storeResponse.json();
    const theStore = storeData[storeID - 1];
    setStore(`Find this deal at ${theStore.storeName}:`);
    // setStore(theStore);
    setStoreLink(theStore.storeName + " deal");
    setStore2(
      `Alternatively you could try ${
        storeData[storeID].storeName
      } where it costs £${gameProperties[1].price} - a saving of ${Math.round(
        gameProperties[1].savings
      )}%:`
    );
    setStoreLink2(storeData[storeID].storeName + " deal");
    console.log(theStore.storeName);
    console.log(link, "link");
    console.log(storeLink, "store link");
  }

  useEffect(() => {
    // remove previous information on new search
    setStore("");
    setStore2("");
    setGamePrice("");
    setCheapestPrice("");
    setTitle("");
    setSaving("");
    setStoreLink("");
    setStoreLink2("");
  }, [text]);

  return (
    <div className="game-display">
      {text.length === 0 && <p className="title">{error}</p>}
      {text.length > 0 &&
        text.map((item) => {
          // display the game names with their images
          return (
            <div>
              <h3 className="title">{item.external}</h3>
              <img
                className="gameimages"
                onClick={handleClick}
                src={item.thumb}
                alt=""
                id={item.gameID} // put the id into the image so we can retrieve it on click
              />
              {/* <p>The current cheapest price is £{item.cheapest}</p> */}
            </div>
          );
        })}{" "}
      {/* after clicking the image, display further information about selected game */}
      <div className="gameinfo">
        <h3 className="price">{gamePrice}</h3>
        <p>
          {title}
          {cheapestPrice}
          {saving}
        </p>
        <p className="text">
          Click on the image to select your game and then click{" "}
          <Button type="primary" id="storebutton" onClick={getStore}>
            here
          </Button>{" "}
          to unveil where to find this deal.
        </p>
        <div></div>
        {/* after clicking the button display the information as to which store */}
        <p>
          {store}{" "}
          <a target="_blank" rel="noreferrer" href={link}>
            {storeLink}
          </a>
        </p>

        <p>
          {store2}
          <a target="_blank" rel="noreferrer" href={link2}>
            {" "}
            {storeLink2}
          </a>
        </p>

        <p></p>
      </div>
    </div>
  );
}
