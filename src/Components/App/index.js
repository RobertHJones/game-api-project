import "./App.css";
import Heading from "../Heading";
import Input from "../Input";
import { useState } from "react";

function App() {
  const [gameInfo, setGameInfo] = useState([]);

  async function fetchData(game) {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${game}`
    );
    const data = await response.json();
    setGameInfo(data.splice(0, 10));
    console.log(data.splice(0, 10));
  }

  return (
    <div>
      <Heading />
      <Input onSubmit={fetchData} />
      <div>
        <h2>{gameInfo[0].external}</h2>
        <img src={gameInfo[0].thumb} alt="" />
        <p>The current cheapest price is £{gameInfo[0].cheapest}</p>
      </div>
    </div>
  );
}

export default App;
