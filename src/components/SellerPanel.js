// SellerPanel.js
import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProduct from "./AddProduct";
import Product from "./Product";
import OrderList from "./OrderList";
import SellerData from "./SellerData";
import ChangePwd from "./ChangePwd";


function SellerPanel() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 10 }}>
        <Routes>
          <Route 
            path="/" 
            element={
                <Home />
            } 
          />
          <Route 
            path="/AddProduct" 
            element={
                <AddProduct />
            } 
          />
          <Route 
            path="/Product" 
            element={
                <Product />
            } 
          />
          <Route 
            path="/Order" 
            element={
                <OrderList />
            } 
          />
           <Route path="/sellerdata" element={<SellerData />} />
           <Route path="/change-password" element={<ChangePwd />} />
        </Routes>
      </main>
    </>
  );
}

export default SellerPanel;
