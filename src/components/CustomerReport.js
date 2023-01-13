import React from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';

const { Search } = Input;


const columns = [
  {
    title: 'Order ID',
    dataIndex: 'order_id',
  },
  {
    title: 'Order Status',
    dataIndex: 'order_status',
  },
  {
    title: 'Date and Time',
    dataIndex: 'order_date',
    render: (text, record) => moment(record.order_date).format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    title: 'Payment Type',
    dataIndex: 'payment_method',
  },
  {
    title: 'Delivery Type',
    dataIndex: 'delivery_method',
  },
  {
    title: 'Total',
    dataIndex: 'order_total',
  },
];

const columns1 = [
  {
    title: 'Customer ID',
    dataIndex: 'user_id',
  },
  {
    title: 'Customer',
    dataIndex: ['first_name', 'last_name'],
    render: (text, record) => `${record.first_name} ${record.last_name}`,
  },
  {
    title: 'Email',
    dataIndex: 'email_address'
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'City',
    dataIndex: 'City'
  },
];


const CustomerOrderReport = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (searchText) {
        try {
          const response = await axios.get('http://localhost:8080/api/report/customer-order-report', {params: {customer_id: searchText}});
          const response1 = await axios.get('http://localhost:8080/api/report/user-details', {params: {customer_id: searchText}});
          setData(response.data);
          setData1(response1.data)
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [searchText]);

  const handleSearch = searchText => {
    setSearchText(searchText);
  };
 
  return (
    <div>
      <Search
        placeholder="Search by customer ID"
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <Table columns={columns1} dataSource={data1} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default CustomerOrderReport;

