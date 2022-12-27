import React from 'react';
import { Button, Table, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; 
import { removeFromCart, clearCart, checkout } from './actions';


const CartX = () => {

  // };
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const cartQuantity = useSelector((state) => state.cartQuantity);

  function handleCheckout() {
    dispatch(checkout());
  }

  function handleEmptyCart() {
    dispatch(clearCart());
  }

  function handleRemoveFromCart(product) {
    dispatch(removeFromCart(product));
  }

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
        <Button onClick={() => handleRemoveFromCart(record)}>Remove</Button>
      ),
    },
  ];

  const footer = () => (
    <div>
      <p>Total: ${cartTotal}</p>
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

export default CartX;



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