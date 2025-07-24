 import React, { useState, useEffect } from 'react';
import { getProductsFn } from "../services/api";
import './ProductList.css';


function ProductList({ onUpdateProduct, onDeleteProduct }) {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const endIndex = page * productsPerPage;
    setVisibleProducts(products.slice(0, endIndex));
    setHasMore(endIndex < products.length);
  }, [products, page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsFn();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <ul className="product-list-items">
        {visibleProducts.map(product => (
          <li key={product.id} className="product-item">
            <strong>{product.title}</strong> - ${product.price}
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}

      {hasMore && !loading && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
}

export default ProductList;
