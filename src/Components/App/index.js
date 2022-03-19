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
    // take the game search from the input and make a fetch request
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${game}`
    );
    const data = await response.json();
    // display the first ten results
    setGameInfo(data.splice(0, 10));
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        // conditionally render based on whether the user is logged in
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
