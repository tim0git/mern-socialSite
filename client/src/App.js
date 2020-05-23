import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";

const App = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
};

export default App;
