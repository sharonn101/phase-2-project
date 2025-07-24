 import React from 'react';
import ProductList from '../ProductList';
import { useEffect, useState } from "react";
import { getProductsFn } from "../../services/api";
 import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProductsFn().then(setProducts);
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "all" || p.category === category)
  );

  // ✅ Define the missing functions
  const onUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const onDeleteProduct = (idToDelete) => {
    setProducts(products.filter(p => p.id !== idToDelete));
  };

  return (
  
  <div className="home-container">
    <h1 className="home-header">Products</h1>

    <div className="filters">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
    </div>

    <div className="products-list">
      {filteredProducts.map(product => (
        <div className="product-card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price} | {product.category}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>

    <ProductList
      products={products}
      onUpdateProduct={onUpdateProduct}
      onDeleteProduct={onDeleteProduct}
    />
  </div>
);

  
}

export default Home;
