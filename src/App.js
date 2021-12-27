import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Highlighter from "./components/Highlighter";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
*/
const App = () => (
  <div className="App">
    <Highlighter />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
