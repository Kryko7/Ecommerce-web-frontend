import React from 'react';
import { Form, Input, Select, Table, Button } from 'antd';

const data = [
  {
    key: 1,
    name: 'Product 1',
    price: '$10',
    quantity: 2,
  },
  {
    key: 2,
    name: 'Product 2',
    price: '$15',
    quantity: 1,
  },
];

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
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Table dataSource={data} columns={columns} />
      <p>Total: {total}</p>
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