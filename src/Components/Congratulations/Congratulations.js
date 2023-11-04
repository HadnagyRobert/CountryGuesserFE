import React from "react";
import './Congratulations.css';
import { Link } from "react-router-dom";

function Congratulations() {
  return (
    <div className="congratulations-container">
      <div className="congratulations-message">
        <h1>Congratulations!</h1>
        <p>You've successfully finished the game!</p>
        <Link to="/homepage"> <button className="button"> Homepage </button> </Link>
      </div>
    </div>
  );
}

export default Congratulations;
