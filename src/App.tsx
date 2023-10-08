import "./App.css";
import Player from "./components/Player";

function App() {
  return (
    <>
      <div className="container">
        <img className="container__logo" src="public/Logo.svg" alt="logo" />
        <img
          className="container__polygon"
          src="public/Polygon 2.svg"
          alt="logo"
        />
        <img
          className="container__polygon2"
          src="public/Polygon 3.svg"
          alt="logo"
        />
      </div>
      <Player />
    </>
  );
}

export default App;
