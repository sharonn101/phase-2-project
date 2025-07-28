 import React from 'react';
import ProductForm from '../ProductForm';
import './Admin.css'; 

function Admin() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin</h1>
      <ProductForm />
    </div>
  );
}

export default Admin;
