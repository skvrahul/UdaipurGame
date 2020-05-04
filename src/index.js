import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./popup.css";
import App from "./App";
import HomePage from "./components/homepage";
import * as serviceWorker from "./serviceWorker";
import Popup from "react-popup";

ReactDOM.render(
  <React.StrictMode>
    <App playerID="0" />
    {/* <HomePage></HomePage> */}
    <Popup></Popup>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
