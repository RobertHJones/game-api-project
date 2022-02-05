import "./App.css";
import Heading from "../Heading";
import Input from "../Input";
import Gamelist from "../Gamelist";
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
    <div className="App">
      <Heading />
      <Input onSubmit={fetchData} />
      <Gamelist text={gameInfo} key={gameInfo.gameID} />
    </div>
  );
}

export default App;
