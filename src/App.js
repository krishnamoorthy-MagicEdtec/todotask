import React from "react";
import { Route } from "react-router-dom";
import AddPost from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
    
      <Navbar />
      <Home />
    </div>
  );
};
export default App;
