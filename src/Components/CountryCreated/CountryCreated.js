import React from 'react';
import './CountryCreated.css';
import { Link } from "react-router-dom";

function CountryCreated() {
    return (
        <div className="created-container">
          <div className="created-message">
            <h1>All good!</h1>
            <p>Country created successfully</p>
            <Link to="/admin"> <button className="button"> OK </button> </Link>
          </div>
        </div>
      );
}

export default CountryCreated