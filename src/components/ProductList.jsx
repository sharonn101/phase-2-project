import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onUpdateProduct, onDeleteProduct }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} />
      ))}
    </div>
  );
}

export default ProductList;