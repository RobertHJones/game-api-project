import "./App.css";
import Heading from "../Heading";
import Input from "../Input";
import { useState } from "react";

function App() {
  const [gameInfo, setGameInfo] = useState([]);
  const [price, setPrice] = useState("");

  async function fetchData(game) {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${game}`
    );
    const data = await response.json();
    setGameInfo(data[0]);
    console.log(data.splice(0, 10));
    setPrice("The current cheapest price is £ ");
  }

  return (
    <div>
      <Heading />
      <Input onSubmit={fetchData} />
      <div>
        <h2>{gameInfo.external}</h2>
        <img src={gameInfo.thumb} alt="" />
        <p>
          {price}
          {gameInfo.cheapest}
        </p>
      </div>
    </div>
  );
}

export default App;
