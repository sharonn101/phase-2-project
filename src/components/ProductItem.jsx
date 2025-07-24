 import React from 'react';
import { updateProductFn, deleteProductFn } from '../services/api';
import './ProductItem.css'; 

function ProductItem({ product, onUpdateProduct, onDeleteProduct }) {
  const handleQuantityChange = (amount) => {
    if (product.stock + amount < 0) return;

    const updatedProduct = { ...product, stock: product.stock + amount };

    updateProductFn(product.id, { stock: updatedProduct.stock })
      .then(() => onUpdateProduct(updatedProduct))
      .catch(err => console.error("Error updating product:", err));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.title}?`)) {
      deleteProductFn(product.id)
        .then(() => onDeleteProduct(product.id))
        .catch(err => console.error("Error deleting product:", err));
    }
  };

  return (
    <div className="product-item">
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.stock}</p>
      <div className="button-group">
        <button onClick={() => handleQuantityChange(1)} className="btn increase">+</button>
        <button onClick={() => handleQuantityChange(-1)} className="btn decrease">-</button>
        <button onClick={handleDelete} className="btn delete">Delete</button>
      </div>
    </div>
  );
}

export default ProductItem;
