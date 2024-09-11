import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Styling file

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Auto-scrolling logic
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollSpeed = 1; // Speed of the scrolling
    const scrollInterval = 10; // Interval time for the scrolling

    let scrollAmount = 0;

    const autoScroll = () => {
      if (carousel.scrollWidth - carousel.scrollLeft <= carousel.clientWidth) {
        // Reset to start if the scroll reaches the end
        carousel.scrollLeft = 0;
      } else {
        // Scroll by the defined speed
        scrollAmount += scrollSpeed;
        carousel.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(autoScroll, scrollInterval); // Set the interval for scrolling

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [products]);

  return (
    <div className="home-page-container">
      {/* Hero Section with Product Carousel */}
      <section className="hero-section">
        <div className="carousel" ref={carouselRef}>
          {/* Duplicate the products to create infinite scrolling */}
          {[...products, ...products].map((product, index) => (
            <div key={index} className="carousel-item">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Product List Section */}
      <section className="product-list-section">
        <h2>All Products</h2>
        <div className="product-list">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <div className='item-details'>
                <h3 className='"item-details-name'>{product.name}</h3>
                <p className='"item-details-company'>{product.company}</p>
                <p className='"item-details-rating'>{product.rating}</p>
                <p className='"item-details-more'>...more details</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
