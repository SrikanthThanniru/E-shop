import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import the CSS file

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
    company: '', // Added company field
    rating: '' // Added rating field
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/products');
    setProducts(response.data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/products', newProduct);
    setNewProduct({ 
      name: '', 
      category: '', 
      price: '', 
      imageUrl: '', 
      description: '', 
      company: '', 
      rating: '' 
    }); // Reset form after submission
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Admin Panel: Product Management</h2>
      
      <ul className="admin-product-list">
        {products.map(product => (
          <li key={product.id} className="admin-product-item">
            <img src={product.imageUrl} alt={product.name} className="admin-product-image" />
            <div className="admin-product-info">
              <h3>{product.category}</h3>
              <p>{product.description}</p>
              <span>{product.name} - ${product.price}</span>
            </div>
            <button 
              className="admin-delete-button" 
              onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form className="admin-product-form" onSubmit={handleAddProduct}>
        <input
          className="admin-input"
          type="text"
          name="name"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="admin-input"
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          className="admin-input"
          type="text"
          name="company"
          placeholder="Company"
          value={newProduct.company}
          onChange={(e) => setNewProduct({ ...newProduct, company: e.target.value })}
        />
        <input
          className="admin-input"
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          className="admin-input"
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <textarea
          className="admin-input admin-description-input"
          name="description"
          placeholder="Product description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        ></textarea>
        <input
          className="admin-input"
          type="text"
          name="rating"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
        />
        <button className="admin-add-button" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPanel;
