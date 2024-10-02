import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./nav"; // Import komponen Navbar dari nav.jsx

const App = () => {
  return (
    <div>
      <Navbar /> {/* Panggil komponen Navbar */}
      <h1>This is React</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
