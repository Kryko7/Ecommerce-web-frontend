import React from 'react';
import { useState} from 'react';
import { Form, Input, Button, Select, Typography } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeliveryForm = () => {
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const { Title } = Typography;


  const onFinish = (values) => {
    console.log('Success:', values);
    Cookies.set('checkoutDetails', JSON.stringify(values));
    try {
      const data = {
        city: values.city,
      };
      console.log(data);
      axios.post('http://localhost:8080/api/delivery/town', data)
        .then(response => {
          if (response.data === true) {
            Cookies.set('mainCity', true);
          } else {
            Cookies.set('mainCity', false);
          }
          const deliveryData = {
            mainCity: Cookies.get('mainCity'),
            inStock: Cookies.get('inStock'),
          };
          try {
            axios.post('http://localhost:8080/api/delivery/delay', deliveryData)
              .then(response => {
                const deliveryDelay = response.data.deliveryDelay;
                const orderStatus = response.data.orderStatus;
                Cookies.set('deliveryDelay', JSON.stringify(deliveryDelay));
                Cookies.set('orderStatus', JSON.stringify(orderStatus));
                navigate('/testing');
              })
              .catch(error => {
                console.log(error);
              });
          } catch (e) {
            console.log(e);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const userCookie = Cookies.get('user');
  // Set the user details in the form
  if (userCookie && !Object.keys(userDetails).length) {
    try {
      const userDetailsFromCookies = JSON.parse(userCookie);
      setUserDetails(userDetailsFromCookies);
      form.setFieldsValue({
        firstName: userDetailsFromCookies.first_name,
        lastName:userDetailsFromCookies.last_name,
        email: userDetailsFromCookies.email_address,
        phone: userDetailsFromCookies.phone_number,
        laneAddress: userDetailsFromCookies.address,
        city: userDetailsFromCookies.City,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
    <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Delivery Details
    </Title>
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your First Name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your Last Name!' }]}
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
        label="Lane Address"
        name="laneAddress"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input />
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
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default DeliveryForm;
