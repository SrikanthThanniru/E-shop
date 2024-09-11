import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import ProductList from './components/ProductList/ProductList';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Checkout from './components/Checkout/Checkout';
import ThankYou from './components/ThankYou/ThankYou';

function App() {
  const navigate = useNavigate();
  
  // Get authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('role');
    return savedRole || '';
  });

  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Save authentication state to localStorage when it changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('role', role);
  }, [isAuthenticated, role]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleResetCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        role={role}
        handleLogout={handleLogout}
        cartItems={cartItems}
      />
      <Routes>
        <Route path="/products" element={isAuthenticated ? <ProductList handleAddToCart={handleAddToCart} /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={isAuthenticated ? <ProductPage/> : <Navigate to="/product/:id" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
        <Route path="/cart" element={isAuthenticated ? (
          <Cart
            cartItems={cartItems}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        ) : <Navigate to="/login" />} />
        <Route path="/checkout" element={isAuthenticated ? (
          <Checkout
            cartItems={cartItems}
            handleResetCart={handleResetCart} // Pass the reset function
          />
        ) : <Navigate to="/login" />} />
        <Route path="/thank-you" element={<ThankYou />} /> {/* Thank You page */}
        <Route path="/" element={isAuthenticated ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
