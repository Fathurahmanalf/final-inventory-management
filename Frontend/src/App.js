import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Product from './components/crudProduct/Product';
import AddProduct from './components/crudProduct/AddProduct';
import DetailProduct from './components/crudProduct/DetailProduct'
import LogActivity from './components/crudProduct/LogActivity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk halaman login */}
        <Route path="/login" element={<Login />} />
        {/* Rute untuk halaman registrasi */}
        <Route path="/register" element={<Register />} />
        {/* Rute untuk dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Rute default, arahkan ke halaman login */}
        <Route index element={<Login />} />
        {/* Rute default, arahkan ke halaman product */}
        <Route path="/product" element={<Product />} />

        <Route path="/logactivity" element={<LogActivity />} />

        {/* Rute default, arahkan ke halaman AddProduct */}
        <Route path="product/add" element={<AddProduct />} />
        {/* Rute default, arahkan ke halaman AddProduct */}
        {/* <Route path="product/edit/:id" element={<EditProduct />} /> */}
        
        <Route path="product/detail/:id" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
