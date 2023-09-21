import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Header from "../common/Header";

const Homepage = () => {
  return (
    <div className="homepage">
      <Header pageTitle={"Welcome to the Homepage"} />
      <div className="button-container">
        <Link to="/react-grid-layout">
          <button className="button">React Grid Layout</button>
        </Link>
        <Link to="/customizable-dropdown">
          <button className="button">Customizable Dropdown</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
