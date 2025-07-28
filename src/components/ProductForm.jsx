 import React, { useState } from 'react';
import { addProductsFn } from '../services/api';
import './ProductForm.css';

function ProductForm() {
  const [product, setProduct] = useState({
    title: '',
    category: '',
    stock: 0,
    price: 0,
    sku: ''
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'stock' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.stock < 0) {
      setFeedback({ message: 'Quantity cannot be negative.', type: 'error' });
      return;
    }

    addProductsFn(product)
      .then(newProduct => {
        setFeedback({ message: `Product "${newProduct.title}" added successfully!`, type: 'success' });
        setProduct({ title: '', category: '', stock: 0, price: 0, sku: '' });
      })
      .catch(err => {
        setFeedback({ message: 'Failed to add product.', type: 'error' });
        console.error("Error adding product:", err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add New Product</h2>
        {feedback.message && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="title" value={product.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input type="url" name="thumbnail" value={product.thumbnail} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
