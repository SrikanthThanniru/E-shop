import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, role, handleLogout, cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle the mobile menu
  const navigate = useNavigate();

  // Calculate the total quantity of items in the cart
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleEshopClick = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={handleEshopClick}>E-shop</div>

      <div className="menu-icon" onClick={toggleMenu}>
        {/* Simple CSS-based hamburger icon */}
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/products" className="nav-link">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            Cart {totalCartItems > 0 && <span className="cart-count">({totalCartItems})</span>}
          </Link>
        </li>
        {isAuthenticated && role === 'admin' && (
          <li><Link to="/admin" className="nav-link">Admin Panel</Link></li>
        )}
        {isAuthenticated ? (
          <li onClick={handleLogout} className="nav-link">Logout</li>
        ) : (
          <li><Link to="/login" className="nav-link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
