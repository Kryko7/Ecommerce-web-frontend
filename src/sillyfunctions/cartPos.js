import React, { useState } from "react";
import { message } from "antd";

export function CartHandler() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  function addToCart(product) {
    setCart([...cart, product]);
    setCartTotal(cartTotal + product.price);
    setCartQuantity(cartQuantity + 1);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item.id !== product.id));
    setCartTotal(cartTotal - product.price);
    setCartQuantity(cartQuantity - 1);
  }

  function clearCart() {
    setCart([]);
    setCartTotal(0);
    setCartQuantity(0);
  }

  function handleCheckout() {
    if (cart.length === 0) {
      message.warning("Your cart is empty");
      return;
    }
    // Implement the checkout process here, e.g. send a request to the server to process the payment
    setCart([]);
    setCartTotal(0);
    setCartQuantity(0);
    message.success("Checkout successful");
  }
}