import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Cookies from 'js-cookie';

const SignIn = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Form values:', values);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', values);
      console.log(response.data);
      const { message: responseMessage , token, result : userDetails} = response.data;
      if (responseMessage === 'Success') {
        Cookies.set('auth_token', token);
        Cookies.set('user', JSON.stringify(userDetails[0]));
        message.success('Successfully logged in');
      } else if (responseMessage === 'Wrong email/password combination') {
        message.error('Wrong email/password combination');
      }
      navigate('/');
    } catch (e) {
      console.log(e);
      message.error('Error while signing in');
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
        Sign In
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
