
import React, { useState } from "react";
import "./EditProductForm.css";

function EditForm({ product, onEdit }) {
  const [formData, setFormData] = useState({
    price: product.price,
    stock: product.stock,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEdit({
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <label className="form-label">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Stock:
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <button type="submit" className="submit-button">
        Save
      </button>
    </form>
  );
}

export default EditForm;
