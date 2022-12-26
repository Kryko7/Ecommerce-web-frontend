import React, { useState } from 'react';
import { Button, Table, Modal, message } from 'antd';
// import {cartHandler} from '../sillyfunctions/cartHandler';


const Cart2 = (props) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
    setQuantity(quantity + 1);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
    setTotal(total - item.price);
    setQuantity(quantity - 1);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning('Your cart is empty');
      return;
    }

    // Implement the checkout process here, e.g. send a request to the server to process the payment

    setCart([]);
    setTotal(0);
    message.success('Checkout successful');
  };

  const handleEmptyCart = () => {
    setCart([]);
    setTotal(0);
    message.warning('Your cart is now empty');
  };

  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => removeFromCart(record)}>Remove</Button>
      ),
    },
  ];

  const footer = () => (
    <div>
      <cartHandler />
      <p>Total: ${total}</p>
      <Button onClick={handleCheckout}>Checkout</Button>
      <Button onClick={handleEmptyCart}>Empty Cart</Button>
    </div>
  );

  return (
    <div>
      <Table dataSource={cart} columns={columns} footer={footer} />
    </div>
  );




};

export default Cart2;
