import React from 'react'
import './CountryDeleted.css'
import { Link } from 'react-router-dom'

function CountryDeleted() {
    return (
        <div className="deleted-container">
          <div className="deleted-message">
            <h1>All good!</h1>
            <p>Country deleted successfully!</p>
            <Link to="/admin"> <button className="button"> OK </button> </Link>
          </div>
        </div>
      );
}

export default CountryDeleted