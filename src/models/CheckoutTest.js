import React from 'react';
import { Form, Input, Select, Table, Button, message, Typography, Descriptions } from 'antd';
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
        checkoutDetails: checkoutDetails,
        order_status: orderStatus,
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
  const cDetails = Cookies.get('checkoutDetails');
  const checkoutDetails = JSON.parse(cDetails);
  const deliveryDelay = Cookies.get('deliveryDelay');
  const inStock = Cookies.get('inStock');
  const mainCity = Cookies.get('mainCity');
  const orderStatus = Cookies.get('orderStatus');
  console.log("LOL");
  console.log(checkoutDetails);
  console.log("LOL");

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
      
    <Title level={4}>Order Details</Title>
      <Descriptions>
        <Descriptions.Item label="Name">{checkoutDetails.firstName + ' ' + checkoutDetails.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{checkoutDetails.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{checkoutDetails.phone}</Descriptions.Item>
        <Descriptions.Item label="Payment Method">{checkoutDetails.paymentMethod}</Descriptions.Item>
        <Descriptions.Item label="Delivery Method">{checkoutDetails.deliveryMethod}</Descriptions.Item>
        <Descriptions.Item label="Expected Delivery Time">{deliveryDelay + " Days"} </Descriptions.Item>
        <Descriptions.Item label="Address">{checkoutDetails.laneAddress}</Descriptions.Item>
        <Descriptions.Item label="City">{checkoutDetails.city}</Descriptions.Item>
      </Descriptions>
      <Form form={form} onFinish={onFinish}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Place Order
          </Button>
        </Form.Item>
      </Form>
  </div>

);
};




export default CheckoutPage;