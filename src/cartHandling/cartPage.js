import React from 'react';
import { Button, Table, Modal, message, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; 
import { removeFromCart, clearCart, checkout } from './actions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const { Title } = Typography;

const CartX = () => {

  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const cartQuantity = useSelector((state) => state.cartQuantity);

  const [localCart, setLocalCart] = useState([]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

   useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        setLocalCart(savedCart || []);
   }, []);


  async function handleCheckout() {
    if (cartQuantity === 0) {
      message.warning('Your cart is empty');
      return;
    }
    Cookies.set('cart', JSON.stringify(cart));
    Cookies.set('cartTotal', JSON.stringify(cartTotal));
    try {
      const data = {
        cart: cart,
      }
      const response = await axios.post('http://localhost:8080/api/delivery/stock-check', cart);
      
      if (response.data.inStock === true) {
        Cookies.set('inStock', true);
      }
      else {
        Cookies.set('inStock', false);
      }
    }
    catch (e) {
      console.log(e);
      console.log("Error in stock check");
    }
    
    navigate('/delivery');
    dispatch(checkout());
  }

  function handleEmptyCart() {
    dispatch(clearCart());
  }

  function handleRemoveFromCart(product) {
    dispatch(removeFromCart(product));
  }

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
        <Button onClick={() => handleRemoveFromCart(record)}>Remove</Button>
      ),
    },
  ];

  const footer = () => (
    <div>
      <p>Total: ${cartTotal}</p>
      <Button onClick={handleCheckout}>Checkout</Button>
      <Button onClick={handleEmptyCart}>Empty Cart</Button>
      <div style={{ float: 'right' }}>
        <Link to="/">
            <Button>Home</Button>
        </Link>
       </div>
    </div>
  );

  return (
    <div>
      <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Cart
      </Title>
      <Table dataSource={localCart} columns={columns} footer={footer} />
    </div>
  );




};

export default CartX;

