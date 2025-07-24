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

  // Load products on component mount
  useEffect(() => {
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
    loadProducts();
  }, []);

  // Update visible products when products or page changes
  useEffect(() => {
    const endIndex = page * productsPerPage;
    setVisibleProducts(products.slice(0, endIndex));
    setHasMore(endIndex < products.length);
  }, [products, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      {loading && <p>Loading products...</p>}

      <ul className="product-list-items">
        {visibleProducts.map(product => (
          <li key={product.id} className="product-item">
            <strong>{product.title}</strong> - ${product.price}
            <div className="product-actions">
              <button onClick={() => onUpdateProduct(product.id, { title: "Updated Name" })}>
                Update
              </button>
              <button onClick={() => onDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && !loading && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}

      {!hasMore && <p>No more products to load</p>}
    </div>
  );
}

export default ProductList;
