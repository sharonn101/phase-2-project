import React from 'react';
import ProductList from '../ProductList';

function Home({ products, onUpdateProduct, onDeleteProduct }) {
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} />
    </div>
  );
}

export default Home;