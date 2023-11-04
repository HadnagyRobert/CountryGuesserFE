import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link className="no-underline text-2xl font-bold text-white" to="/">My Website</Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/login">Login</Link>
              <Link className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/homepage">Homepage</Link>
              <Link className="no-underline hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium" to="/contact">Contact</Link>
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

export default AdminNavbar;