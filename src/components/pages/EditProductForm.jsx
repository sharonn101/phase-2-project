import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="handleSubmit-form">
      <label className="block">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="price-input"
        />
      </label>
      <label className="block">
        Stock:
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="stock-input"
        />
      </label>
      <button
        type="submit"
        className="submitButton"
      >
        Save
      </button>
    </form>
  );
}

export default EditForm;
