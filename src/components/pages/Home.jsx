import React, { useState, useEffect } from "react";
import './Home.css';
import { getProductsFn, addProductsFn, updateProductFn, deleteProductFn } from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  // Load products
  useEffect(() => {
    getProductsFn()
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    addProductsFn(newProduct)
      .then(addedProduct => {
        if (addedProduct) {
          setProducts(prev => [...prev, addedProduct]);
        }
      });
  };

  const handleUpdateProduct = (id, updatedData) => {
    updateProductFn(id, updatedData)
      .then(updatedProduct => {
        if (updatedProduct) {
          setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        }
      });
  };

  const handleDeleteProduct = (id) => {
    deleteProductFn(id)
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
      });
  };

  // Get categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "all" || p.category === category)
  );

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="home-container">
      <h1>Products</h1>

      <div className="filters">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="products-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail || 'https://via.placeholder.com/150'}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => handleUpdateProduct(product.id, { title: "Updated" })}>
              Update
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;