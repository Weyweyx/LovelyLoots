import React from "react";
import Cart from "../components/Cart";
import TitleHeader from "../components/TitleHeader";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const CartPage = () => {
  return (
    <main>
      <TitleHeader /> 
      <Nav />
      <div className="container my-1">
        <h2>Shopping Cart</h2>
        <Cart />
      </div>
      <Footer />
    </main>
  );
};

export default CartPage;
