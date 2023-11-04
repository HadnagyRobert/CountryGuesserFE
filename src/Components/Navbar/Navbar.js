import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function Navbar() {
  const { isAuthenticated,tokenPayload } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated && tokenPayload) {
      setIsAdmin(tokenPayload.roles.includes('ADMIN'));
    }
  }, [tokenPayload]);

  const linkStyle = {
    textDecoration: 'none'
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link style={linkStyle} className="no-underline text-2xl font-bold text-white" to="/">Country Guesser</Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link style={linkStyle} className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/homepage">Homepage</Link>
              <Link style={linkStyle} className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/profile">Profile</Link>
              {
                isAdmin && 
                <Link style={linkStyle} className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/admin">Admin</Link>
              }
            </div>
          </div>
          <div className="md:hidden">
            <button className="navbar-toggler">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;