import "./App.css";

import { Link } from "react-router";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Welcome to Tic Tac Toe</h1>
        <Link className="link" to="/game">
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default App;
