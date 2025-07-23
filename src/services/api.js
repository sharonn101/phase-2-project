function getProductsFn() {
    return (
      fetch("https://dummyjson.com/products")
      .then(resp => resp.json())
      .then(data => data.products)
      .catch(err => console.error("Error fetching products:", err))
    )
}

function addProductsFn(product) {
    return (
      fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(resp => resp.json())
      .catch(err => console.error("Error adding product:", err))
    )
}

function updateProductFn(id, product) {
    return (
      fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(resp => resp.json())
      .catch(err => console.error("Error updating product:", err))
    )
}

function deleteProductFn(id) {
    return (
      fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE"
      })
      .then(resp => resp.json())
      .catch(err => console.error("Error deleting product:", err))
    )
}

