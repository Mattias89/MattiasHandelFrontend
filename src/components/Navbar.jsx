import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo.jpg" alt="OnlineShop Logo"/>
        </Link>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/byxor">Byxor</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
