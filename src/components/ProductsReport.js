
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Table, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function DateForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);

  const onFinish = async (values) => {
    const startDateFormatted = new Date(startDate).toISOString().slice(0, 10);
    const endDateFormatted = new Date(endDate).toISOString().slice(0, 10);
    try {
      const response = await axios.get('http://localhost:8080/api/report/products-with-most-sales', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'product_item_id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
    },
    {
      title: 'Orders',
      dataIndex: 'total_sales',
    },
  ];

  return (
    <div>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item label="Start Date" name="startDate">
          <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </Form.Item>
        <Form.Item label="End Date" name="endDate">
          <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default DateForm;