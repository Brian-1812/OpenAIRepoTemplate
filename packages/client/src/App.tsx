import React from "react";
import logo from "./logo.svg";
import "./App.css";
import _ from "lodash";
import { QueryPayload } from "common-types";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {_.toUpper("Learn React")}
        </a>

        {/* NEW */}
        <button
          onClick={() => {
            fetch("http://localhost:3001/", {})
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}
        >
          GET SOME DATA
        </button>
      </header>
    </div>
  );
}

export default App;
