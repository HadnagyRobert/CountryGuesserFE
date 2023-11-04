import React from 'react'
import './CountryEdited.css'
import { Link } from 'react-router-dom'

function CountryEdited() {
    return (
        <div className="edited-container">
          <div className="edited-message">
            <h1>All good!</h1>
            <p>Country updated successfully!</p>
            <Link to="/admin"> <button className="button"> OK </button> </Link>
          </div>
        </div>
      );
}

export default CountryEdited