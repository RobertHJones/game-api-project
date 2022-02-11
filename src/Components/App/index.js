import "./App.css";
import Heading from "../Heading";
import Input from "../Input";
import Gamelist from "../Gamelist";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login";

function App() {
  const [gameInfo, setGameInfo] = useState([]);
  const { isAuthenticated } = useAuth0();

  async function fetchData(game) {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${game}`
    );
    const data = await response.json();
    setGameInfo(data.splice(0, 10));
    // console.log(data.splice(0, 10));
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <main>
          <Heading />
          <Input onSubmit={fetchData} />
          <Gamelist text={gameInfo} key={gameInfo.gameID} />
          <Login />
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
