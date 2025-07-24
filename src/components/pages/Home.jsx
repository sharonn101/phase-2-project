import React from 'react';
import ProductList from '../ProductList';
import { useEffect, useState } from "react";
import { getProductsFn } from "../../services/api";

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

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (deletedProductId) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== deletedProductId)
    );
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price} | {product.category}</p>
            <img src={product.thumbnail} alt={product.title} style={{ width: "100px" }} />
            <p>{product.description}</p>
          </div>
        ))}
      </div>
     <ProductList products={products} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} />
   </div>
  );
}

export default Home;