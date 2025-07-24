import React from 'react';
import ProductItem from './ProductItem';
import { useState, useEffect } from "react";
import { getProductsFn } from "../services/api";

function ProductList({ products, onUpdateProduct, onDeleteProduct }) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 10; // Number of products to load each time

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
      <h2>Products</h2>

      <ul>
        {visibleProducts.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}

      {!hasMore && <p>No more products to load</p>}
      <div className="product-items">
        {visibleProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;