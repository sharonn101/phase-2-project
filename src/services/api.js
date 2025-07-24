// services/api.js

export const getProductsFn = () => {
  return fetch("http://localhost:3000/products")
    .then(resp => {
      if (!resp.ok) {
        console.error("Server response was not ok");
        return []; // Return empty array if error
      }
      return resp.json();
    })
    .then(data => Array.isArray(data) ? data : []) // Ensure always array
    .catch(err => {
      console.error("Error fetching products:", err);
      return []; // Return empty array if error
    });
};

export const addProductsFn = (product) => {
  return fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(resp => {
    if (!resp.ok) {
      console.error("Failed to add product");
      return null;
    }
    return resp.json();
  })
  .catch(err => {
    console.error("Error adding product:", err);
    return null;
  });
};

export const updateProductFn = (id, product) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(resp => {
    if (!resp.ok) {
      console.error("Failed to update product");
      return null;
    }
    return resp.json();
  })
  .catch(err => {
    console.error("Error updating product:", err);
    return null;
  });
};

export const deleteProductFn = (id) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE"
  })
  .then(resp => {
    if (!resp.ok) {
      console.error("Failed to delete product");
      return { success: false };
    }
    return resp.json();
  })
  .catch(err => {
    console.error("Error deleting product:", err);
    return { success: false };
  });
};