import React from 'react';
import { Button, Table, Modal, message } from 'antd';
//import {cartHandler} from '../sillyfunctions/cartHandler';
import {cartHandler} from '../sillyfunctions/cartHandler';
import cartHelper from '../sillyfunctions/cartHelper';

const {addToCart, removeFromCart, clearCart, handleCheckout } = cartHelper;
const states = cartHelper.state;
const {cart, cartTotal, cartQuantity} = states;

const Cart2 = (props) => {

  // };

  const dummyData = [
    {
      'name': 'Apple',
      'price': 1.99,
      'quantity': 1,
    },
    {
      'name': 'Banana',
      'price': 2.99,
      'quantity': 1,
    },
    {
      'name': 'Orange',
      'price': 3.99,
      'quantity': 1,
    },
  ];
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
      {/* <cartHandler /> */}
      <p>Total: ${cartTotal}</p>
      <Button onClick={handleCheckout}>Checkout</Button>
      <Button onClick={clearCart}>Empty Cart</Button>
    </div>
  );

  return (
    <div>
      <Table dataSource={cart} columns={columns} footer={footer} />
    </div>
  );




};

export default Cart2;



  // const [cart, setCart] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  // const addToCart = (item) => {
  //   setCart([...cart, item]);
  //   setTotal(total + item.price);
  //   setQuantity(quantity + 1);
  // };

  // const removeFromCart = (item) => {
  //   setCart(cart.filter((i) => i.id !== item.id));
  //   setTotal(total - item.price);
  //   setQuantity(quantity - 1);
  // };

  // const handleCheckout = () => {
  //   if (cart.length === 0) {
  //     message.warning('Your cart is empty');
  //     return;
  //   }

  //   // Implement the checkout process here, e.g. send a request to the server to process the payment

  //   setCart([]);
  //   setTotal(0);
  //   message.success('Checkout successful');
  // };

  // const handleEmptyCart = () => {
  //   setCart([]);
  //   setTotal(0);
  //   message.warning('Your cart is now empty');