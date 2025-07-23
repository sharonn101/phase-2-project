// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import { getProductsFn, addProductsFn, updateProductFn, deleteProductFn } from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    getProductsFn().then(setProducts);
  }, []);

  const handleAddProduct = () =>
    addProductsFn({ name: newProductName })
      .then(() => {
        setNewProductName("");
        getProductsFn().then(setProducts);
      });

  const handleUpdateProduct = (id) =>
    updateProductFn(id, { name: prompt("Enter new product name:") || "Unnamed" })
      .then(() => getProductsFn().then(setProducts));

  const handleDeleteProduct = (id) =>
    alert("Are you sure?") &&
    deleteProductFn(id)
      .then(() => getProductsFn().then(setProducts));

  return (
    <div>
      <h2>Products</h2>
      <input
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
        placeholder="Product name"
      />
      <button onClick={handleAddProduct}>Add</button>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title || product.name}
            <button onClick={() => handleUpdateProduct(product.id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;