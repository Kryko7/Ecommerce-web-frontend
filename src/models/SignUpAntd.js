import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const SignUp = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Form values:', values);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        laneAddress: values.laneAddress,
        city: values.city,
        telephoneNumber: values.telephoneNumber,
      });
      console.log(response.data);
      const { message: responseMessage } = response.data;
      if (responseMessage === 'Success') {
        message.success('Successfully registered');
      } else if (responseMessage === 'Email already in use') {
        message.error('Email already in use');
      }
      navigate('/');
    } catch (e) {
      console.log(e);
      message.error('Error while signing up');
    }
  };

  return (
    <Form onFinish={onFinish}>
    <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Sign Up
        </Title>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item name="laneAddress" rules={[{ required: true, message: 'Please input your lane address!' }]}>
        <Input placeholder="Lane Address" />
      </Form.Item>
      <Form.Item name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
        <Input placeholder="City" />
      </Form.Item>
      <Form.Item name="telephoneNumber" rules={[{ required: true, message: 'Please input your telephone number!' }]}>
        <Input placeholder="Telephone Number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        </Form.Item>
    </Form>
    );
};

export default SignUp;
