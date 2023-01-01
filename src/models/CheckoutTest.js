import React from 'react';
import { Form, Input, Select, Table, Button, message, Typography } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
];

const CheckoutPage = () => {
  const { Title } = Typography;
  const data = [];
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = React.useState({});
  const navigate = useNavigate();

  const onFinish = async(values) => {
    console.log('Form values:', values);

    try {
      const data = {
        cart: cartDetails,
        cartTotal: cartTotal,
        userDetails: userDetails,
        checkoutDetails: values,
        order_status: 'pending',
      };
      console.log(data);
      const response = await axios.post('http://localhost:8080/api/order/purchase', data);
      console.log("Order placed successfully");

      // Remove the cart from cookies
      Cookies.remove('cart');
      Cookies.remove('cartTotal');
      message.success('Order placed successfully');
      navigate('/');
    } catch (e) {
      console.log(e);
      console.log("Error in placing order");
      message.error('Error in placing order');

    }
  
  };

  const cart = Cookies.get('cart');
  const cartTotal = Cookies.get('cartTotal');
  const checkoutDetails = Cookies.get('checkoutDetails');
  const deliveryDelay = Cookies.get('deliveryDelay');
  console.log(checkoutDetails);
  console.log(deliveryDelay);

  let cartDetails;
  try {
    cartDetails = JSON.parse(cart);
    console.log(cartDetails);
    console.log(cartDetails.length);
    for(let i = 0; i < cartDetails.length; i++) {
      data.push({
        name: cartDetails[i].name,
        price: cartDetails[i].price,
        quantity: cartDetails[i].quantity,
      });
    }
  } catch (e) {
    console.log(e);
    cartDetails = [];
  }
  console.log(cartDetails);
  // Get the user details from cookies
  const userCookie = Cookies.get('user');
  // Set the user details in the form
  if (userCookie && !Object.keys(userDetails).length) {
    try {
      const userDetailsFromCookies = JSON.parse(userCookie);
      setUserDetails(userDetailsFromCookies);
      form.setFieldsValue({
        name: userDetailsFromCookies.first_name + ' ' + userDetailsFromCookies.last_name,
        email: userDetailsFromCookies.email_address,
        phone: userDetailsFromCookies.phone_number,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Checkout
      </Title>
      <Title level={4} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Order Summary
      </Title>
      <Table dataSource={data} columns={columns} />
      <p>Total: {cartTotal}</p>
      <Title level={4} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Delivery Details
      </Title>
      
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Please select a payment method!' }]}
        >
          <Select>
            <Select.Option value="creditCard">Credit Card</Select.Option>
            <Select.Option value="debitCard">Debit Card</Select.Option>
            <Select.Option value="paypal">PayPal</Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
            label="Delivery Method"
            name="deliveryMethod"
            rules={[{ required: true, message: 'Please select a delivery method!' }]}
        >
        <Select>
          <Select.Option value="standard">Standard</Select.Option>
          <Select.Option value="express">Express</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Checkout
        </Button>
      </Form.Item>
    </Form>
  </div>

);
};




export default CheckoutPage;