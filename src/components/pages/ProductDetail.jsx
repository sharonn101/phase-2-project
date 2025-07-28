import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditForm from "./EditProductForm";

import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleEditSubmit(updatedData) {

    setProduct((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setIsEditing(false);
  }

  function handleDelete() {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      alert("Simulated delete. Navigating back to product list.");
      navigate("/products");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-container">
      <h2 className="product-title">{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className="image-container" />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>

      {!isEditing ? (
        <div className="edit-container">
          <button
            onClick={handleEditClick}
            className="handleEditClickButton"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="handleDeleteButton"
          >
            Delete
          </button>
        </div>
      ) : (
        <EditForm product={product} onEdit={handleEditSubmit} />
      )}
    </div>
  );
}

export default ProductDetail;
