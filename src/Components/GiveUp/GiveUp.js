import React from "react";
import './GiveUp.css';
import { Link } from "react-router-dom";

function GiveUp() {
  return (
    <div className="tryagain-container">
      <div className="tryagain-message">
        <h1>It's Ok!</h1>
        <p>You can try again next time!</p>
        <Link to="/homepage"> <button className="button"> Homepage </button> </Link>
      </div>
    </div>
  );
}

export default GiveUp;
